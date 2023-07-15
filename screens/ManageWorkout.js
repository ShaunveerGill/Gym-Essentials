import React, { isValidElement, useContext, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Animated, FlatList, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutsContext } from '../WorkoutsContext';
import { auth } from "../firebase";
import axios from 'axios';
import TimerModal from './TimerModal';

function ManageWorkout({ route }) {
  const workoutsCtx = useContext(WorkoutsContext);
  const navigation = useNavigation();
  const editedWorkoutId = route.params?.workoutId;
  const isEditing = !!editedWorkoutId;
  const user = auth.currentUser;
  const BACKEND_URL = 'https://gym-essentials-default-rtdb.firebaseio.com'

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const selectedWorkout = workoutsCtx.workouts.find(
    (workout) => workout.id === editedWorkoutId
  );
  
  const [inputs, setInputs] = useState({
    exercise: {
      value: selectedWorkout ? selectedWorkout.exercise : '',
      isValid: true,
    },
    record: {
      value: selectedWorkout ? selectedWorkout.record : '',
      isValid: true,
    },
    date: {
      value: selectedWorkout ? selectedWorkout.date.toISOString().slice(0, 10): '',
      isValid: true,
    }
  });

  async function deleteWorkoutHandler() {
    setIsSubmitting(true);
    try {
      await axios.delete(BACKEND_URL + '/users/' + user.uid + '/workouts/' + editedWorkoutId + '.json');
      workoutsCtx.deleteWorkout(editedWorkoutId);
      navigation.navigate('Workouts');
    } catch (error) {
      setError('Could not delete workout - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.navigate('Workouts');
  }

  async function storeWorkout(workoutData) {
    const response = await axios.post(BACKEND_URL + '/users/' + user.uid + '/workouts.json', workoutData);
    const id = response.data.name;
    return id;
  }  

  async function confirmHandler(workoutData) {
    setIsSubmitting(true);
    try {
      if (isEditing){
        workoutsCtx.updateWorkout(editedWorkoutId, workoutData);

        await axios.put(BACKEND_URL + '/users/' + user.uid + '/workouts/' + editedWorkoutId + '.json', workoutData);
      } else {
        const id = await storeWorkout(workoutData);
        workoutsCtx.addWorkout({...workoutData, id: id});
      }
      navigation.navigate('Workouts');
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const workoutData = {
      exercise: inputs.exercise.value,
      record: inputs.record.value,
      date: new Date(inputs.date.value),
    };

    const exerciseIsValid = workoutData.exercise.trim().length > 0;
    const recordIsValid = workoutData.record.trim().length > 0;
    const dateIsValid = workoutData.date.toString() !== 'Invalid Date';

    if (!exerciseIsValid || !recordIsValid|| !dateIsValid) { // || !recordIsValid|| !dateIsValid
      setInputs((curInputs) => {
        return {
          exercise: { value: curInputs.exercise.value, isValid: exerciseIsValid },
          record: { value: curInputs.record.value, isValid: recordIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid }
        };
      });
      return;
    }

    confirmHandler(workoutData);
  }

  const formIsInvalid =
    !inputs.exercise.isValid ||
    !inputs.record.isValid ||
    !inputs.date.isValid;

  if (error && !isSubmitting) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, styles.errorTitle]}>An error occurred!</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (isSubmitting) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>      
    );
  }

  // ------------------------------------------------------------------------------------

  const { workoutId } = route.params;

  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);
  const dropAnim = useRef(new Animated.Value(-100)).current;

  const dropDown = () => {
    Animated.timing(dropAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const addExerciseHandler = () => {
    dropDown();
    setExercises((currentExercises) => [
      ...currentExercises,
      { id: Math.random().toString(), name: '', sets: [{ sets: '', reps: '', done: false }] },
    ]);
  };

  const addSetHandler = (index) => {
    const newExercises = [...exercises];
    newExercises[index].sets.push({ sets: '', reps: '', done: false });
    setExercises(newExercises);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    setTimerReset(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const resetTimer = () => {
    setModalVisible(true);
    setTimerReset(true);
  };

  const toggleCheckbox = () => {
    setCheckboxChecked(!checkboxChecked);
    if (!checkboxChecked) {
      setModalVisible(true);
      setTimerReset(false);
    }
  };

  const handleSave = () => {
    navigation.goBack();
  };

  // ------------------------------------------------------------------------------------
  const renderExerciseItem = ({ item, index }) => (
    <View style={styles.exerciseContainer}>
      <View>
        <View style={styles.itemContainer}>
          <Text style={styles.exerciseLabel}>Exercise:</Text>
          <TextInput 
            style={styles.exerciseInput} 
            value={item.name}
            onChangeText={(text) => {
              const newExercises = [...exercises];
              newExercises[index].name = text;
              setExercises(newExercises);
            }}
          />
        </View>
  
        {item.sets.map((setItem, setIndex) => (
  <View style={styles.itemContainer} key={`set-${index}-${setIndex}`}>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Sets:</Text>
      <View style={styles.inputWrapper}>
        <TextInput 
          style={styles.smallInput} 
          value={setItem.sets}
          onChangeText={(text) => {
            const newExercises = [...exercises];
            newExercises[index].sets[setIndex].sets = text;
            setExercises(newExercises);
          }}
        />
      </View>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Reps:</Text>
      <View style={styles.inputWrapper}>
        <TextInput 
          style={styles.smallInput} 
          value={setItem.reps}
          onChangeText={(text) => {
            const newExercises = [...exercises];
            newExercises[index].sets[setIndex].reps = text;
            setExercises(newExercises);
          }}
        />
      </View>
    </View>

    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
        {checkboxChecked ? (
          <Text style={styles.checkboxText}>✓</Text>
        ) : (
          <Text style={styles.checkboxText}>☐</Text>
        )}
      </TouchableOpacity>
      <TimerModal
        isVisible={modalVisible}
        onClose={closeModal}
        duration={60}
        onReset={resetTimer}
      />
    </View>

    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={() => handleDeleteSet(index, setIndex)}>
        <Ionicons name="trash-outline" size={28} style={styles.trashIcon} />
      </TouchableOpacity>
    </View>
  </View>
))}

  
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => addSetHandler(index)}
          >
            <Text style={styles.buttonText}>Add Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  // ------------------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <View style={styles.container1}>
            <View style={styles.headerContainer1}>
              <TouchableOpacity style={styles.headerButton1} onPress={() => navigation.goBack()}>
                <Text style={styles.headerButtonText1}>X</Text>
              </TouchableOpacity>
              {/*<View style={styles.headerSpace1} />*/}
              <TouchableOpacity style={styles.headerButton1} onPress={() => handleSave()}>
                <Text style={styles.headerButtonText1}>Save</Text>
              </TouchableOpacity>
            </View>
            <TextInput 
              style={styles.input1} 
              placeholder="Workout Name" 
              value={workoutName}
              onChangeText={inputChangedHandler.bind(this, 'workoutname')}
            />

            <FlatList 
              data={exercises}
              renderItem={renderExerciseItem}
              keyExtractor={(item) => item.id}
            />

            <TouchableOpacity 
              style={styles.button1} 
              onPress={addExerciseHandler}
            >
              <Text style={styles.buttonText1}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container2}>
           
            <View style={styles.header2}>
              <Text style={styles.title2}>Adding Workout</Text>
            </View>

            <View style={styles.center2}>
              <Text style={styles.question2}>Workout Name</Text>
              <TextInput style={styles.inputBox2}/>
            </View>

            <TouchableOpacity
              style={styles.save2}
              onPress={() => {navigation.goBack()}}
            >
              <Text style={styles.buttonText2}>Save</Text>
            </TouchableOpacity>

          </View>
         </TouchableWithoutFeedback>
        </>
      )}
    </View>
  );
  
}

export default ManageWorkout;

const styles = StyleSheet.create({
  exerciseInput: {
    flex: 1,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 10,
  },
  exerciseLabel: {
    marginLeft: 0,
    marginRight: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    justifyContent: 'space-between',
  },
  label: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallInput: {
    height: 24,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 10,
    width: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 0, // Add padding on the right side
  },
  checkbox: {
    borderWidth: 1,
    borderColor: 'black',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 18,
  },
  exerciseContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  exerciseContent: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20, // Add horizontal padding for space on the sides
  },
  text: {
    marginLeft: 40, // Adjust the left margin as per your preference
  },
  inputText: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: '80%',
  },
  buttonContainer: {
    alignItems: 'center', // Align buttons in the center horizontally
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 36,
    marginBottom: 10, // Add bottom margin for spacing between buttons
  },
  buttonText : {
    color: 'white',
    fontSize: 14,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    margin: 8,
  },
  invalidLabel: {
    color: 'red'
  },
  invalidInput: {
    backgroundColor: '#ffb6c1'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  /*BELOW ARE STYLES FROM EDITWORKOUT.js */
  wrapper1: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  container1: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  headerContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerButton1: {
    padding: 10,
  },
  headerButtonText1: {
    fontSize: 18,
  },
  headerSpace1: {
    flex: 1,
  },
  input1: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
    width: '100%',
  },
  smallInput1: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '20%',
    alignSelf: 'center',
  },
  itemContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    justifyContent: 'space-between',
  },
  text1: {
    marginRight: 5,
    alignSelf: 'center',
  },
  button1: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  buttonText1: {
    color: 'black',
    fontSize: 18,
  },
  checkbox1: {
    borderWidth: 1,
    borderColor: 'black',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  checkboxText1: {
    fontSize: 18,
  },

  //AGE EDIT STYLES for ):(
  container2: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  title2: {
    fontSize: 40,
    marginRight: 10,
  },
  inputBox2: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: "100%",
  },
  buttonText2: {
    color: "white",
    fontSize: 16,
  },
  questions2: {
    marginBottom: 10,
  },
  save2: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    alignSelf: "center",
  },
});


