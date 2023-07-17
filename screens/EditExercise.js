import React, { isValidElement, useContext, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Animated, FlatList, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutsContext } from '../WorkoutsContext';
import { auth } from "../firebase";
import axios from 'axios';

function EditExercise({ route }) {
  const workoutsCtx = useContext(WorkoutsContext);
  const { currentEditId } = route.params;
  const navigation = useNavigation();
  const BACKEND_URL = 'https://gym-essentials-default-rtdb.firebaseio.com'
  const user = auth.currentUser;
  const [isSubmitting, setIsSubmitting] = useState(false);

const selectedExercise = workoutsCtx.workouts.find((workout) => workout.id === currentEditId);
  
const [inputs, setInputs] = useState({
  exerciseName: {
    value: selectedExercise ? selectedExercise.exerciseName : '',
    isValid: true,
  },
  sets: {
    value: selectedExercise ? selectedExercise.sets : '',
    isValid: true,
  },
  reps: {
    value: selectedExercise ? selectedExercise.reps : '',
    isValid: true,
  },
});

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      };
    });
  }
  

    async function storeWorkout(exerciseData) {
      const response = await axios.post(BACKEND_URL + '/users/' + user.uid + '/workouts/' + currentEditId + '/exercises.json', exerciseData);
      const id = response.data.name;
      return id;
    }  

  async function confirmHandler(exerciseData) {
        console.log(exerciseData);
        if (true){
          workoutsCtx.addExercise(currentEditId, exerciseData);
  
          await axios.post(BACKEND_URL + '/users/' + user.uid + '/workouts/' + currentEditId + '/exercises.json', exerciseData);
        } 

        navigation.goBack();
      
    }
    
    
      
      function submitHandler() {
        const exerciseData = {
          exerciseName: inputs.exerciseName.value,
          sets: inputs.sets.value,
          reps: inputs.reps.value,
        };
      
        const exerciseNameIsValid = exerciseData.exerciseName.trim().length > 0;
        const setsIsValid = exerciseData.sets.trim().length > 0;
        const repsIsValid = exerciseData.reps.trim().length > 0;
      
        if (!exerciseNameIsValid || !setsIsValid || !repsIsValid) {
          setInputs((curInputs) => {
            return {
              exerciseName: { value: curInputs.exerciseName.value, isValid: exerciseNameIsValid },
              sets: { value: curInputs.sets.value, isValid: setsIsValid },
              reps: { value: curInputs.reps.value, isValid: repsIsValid }, 
            };
          });
          return;
        }
        console.log("hellos");
        confirmHandler(exerciseData);
      }
      
      console.log(workoutsCtx.exercises);
      console.log(currentEditId);
  return (
    <View style={styles.wrapper1}>
      <View style={styles.container}>
        <View style={styles.header2}>
          <Text style={styles.title2}>Adding Exercise</Text>
        </View>
        <View style={styles.itemContainer1}>
          <Text style={styles.text1}>Exercise:</Text>
          <TextInput 
            style={styles.exerciseInput} 
            onChangeText={(text) => inputChangedHandler('exerciseName', text)}
            />
        </View>

        <View style={styles.itemContainer1}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sets:</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.smallInput} 
                onChangeText={(text) => inputChangedHandler('sets', text)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Reps:</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.smallInput} 
                onChangeText={(text) => inputChangedHandler('reps', text)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button1} onPress={submitHandler}>
          <Text style={styles.buttonText1}>Submit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button1} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText1}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    paddingRight: 0, 
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
    paddingHorizontal: 20, 
  },
  text: {
    marginLeft: 40, 
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
    alignItems: 'center', 
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
    marginBottom: 10, 
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
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  buttonText1: {
    color: 'white',
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
  title2: {
    fontSize: 40,
    marginRight: 10,
    paddingBottom: 30,
  },

});

export default EditExercise;


