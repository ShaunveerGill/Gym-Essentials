import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { auth } from "../../../firebase";
import TimerModal from "../Workouts/TimerModal";
import { Alert } from "react-native";
import { confirmHandler, confirmDeleteExercise, confirmDelete } from "../../data/userServices";
import * as TimerController from "../../controller/TimerController";
import { ChangedHandler } from "../../controller/UserController";

function ManageWorkout({ route }) {
  const workoutsCtx = useContext(WorkoutsContext);
  const navigation = useNavigation();
  const editedWorkoutId = route.params?.workoutId;
  const isEditing = !!editedWorkoutId;
  const user = auth.currentUser;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const { resetTimer, closeModal, toggleCheckbox } = TimerController;

  const [modalVisible, setModalVisible] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const [exerciseModalVisible, setExerciseModalVisible] = useState({});

  const selectedWorkout = workoutsCtx.workouts.find(
    (workout) => workout.id === editedWorkoutId
  );

  const [inputs, setInputs] = useState({
    workoutName: {
      value: selectedWorkout ? selectedWorkout.workoutName : "",
      isValid: true,
    },
  });


  
  async function deleteExerciseHandler(exerciseId) {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              await confirmDeleteExercise(
                exerciseId,
                user.uid,
                editedWorkoutId,
                setIsSubmitting,
                setError,
                selectedWorkout, 
                workoutsCtx 
              );
            } catch (error) {
              console.error("Error deleting exercise:", error);
            }
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }
  

  function deleteHandler() {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete?",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              await confirmDelete(
                user.uid,
                editedWorkoutId,
                setIsSubmitting,
                setError,
                workoutsCtx
              );
              navigation.navigate("Workouts");
            } catch (error) {
              console.error("Error deleting workout:", error);
            }
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }
  

  function submitHandler() {
    const workoutData = {
      workoutName: inputs.workoutName.value,
    };

    const workoutNameIsValid = workoutData.workoutName.trim().length > 0;

    if (!workoutNameIsValid) {
      setInputs((curInputs) => {
        return {
          workoutName: {
            value: curInputs.workoutName.value,
            isValid: workoutNameIsValid,
          },
        };
      });
      return;
    }
    confirmHandler(
      workoutData,
      user.uid,
      editedWorkoutId,
      setIsSubmitting,
      setError,
      workoutsCtx,
      isEditing,
    );
    navigation.navigate("Workouts");
  }

  const formIsInvalid = !inputs.workoutName.isValid;

  if (error && !isSubmitting) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, styles.errorTitle]}>
          An error occurred!
        </Text>
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

  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <View style={styles.itemContainer}>
        <View style={styles.exerciseLabelContainer}>
          <Text style={styles.exerciseLabel}>Exercise:</Text>
           <ScrollView horizontal={true} style={styles.scrollView}>
             <Text style={styles.text}>{item.exerciseName}</Text>
           </ScrollView>
        </View>
        <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditExercise", {
              currentEditId: editedWorkoutId,
              exerciseId: item.id,
            })
          }
        >
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>
      </View>

      <View style={styles.itemContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.exerciseLabel}>Sets:</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>{item.sets}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.exerciseLabel}>Reps:</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>{item.reps}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => toggleCheckbox(item.id, setCheckboxChecked, checkboxChecked, setExerciseModalVisible)}
            style={styles.c}
          >
            {checkboxChecked ? (
              <Ionicons
                name="timer-outline"
                size={25}
                style={styles.trashIcon}
              />
            ) : (
              <Ionicons
                name="timer-outline"
                size={25}
                style={styles.trashIcon}
              />
            )}
          </TouchableOpacity>
          <TimerModal
            isVisible={exerciseModalVisible[item.id]}
            onClose={() => closeModal(item.id, setExerciseModalVisible)}
            duration={60}
            onReset={() => resetTimer(setModalVisible, setTimerReset)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => deleteExerciseHandler(item.id)}>
            <Ionicons name="trash-outline" size={28} style={styles.trashIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <View style={styles.container1}>
            <View style={styles.headerContainer1}>
              <TouchableOpacity
                style={styles.headerButton1}
                onPress={() => navigation.goBack()}
              >
                <Ionicons
                  name="arrow-back"
                  size={28}
                  style={styles.goBackIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButton1}
                onPress={deleteHandler}
              >
                <Text style={styles.headerButtonText1}>Delete Workout</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
              <Text style={styles.input1}>{inputs.workoutName.value}</Text>
            </ScrollView>
            {selectedWorkout?.exercises &&
              selectedWorkout.exercises.length > 0 && (
                <FlatList
                  data={selectedWorkout.exercises}
                  renderItem={renderExerciseItem}
                  keyExtractor={(item) => item.id}
                />
              )}

            {formIsInvalid && (
              <Text style={styles.errorText}>
                Invalid input values - please check your entered data!
              </Text>
            )}

            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("EditExercise", { currentEditId: editedWorkoutId })}>
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
                <TextInput
                  style={[
                    styles.input,
                    !inputs.workoutName.isValid && styles.invalidInput,
                  ]}
                  onChangeText={(enteredValue) =>
                    ChangedHandler("workoutName", enteredValue, setInputs)
                  }
                  value={inputs.workoutName.value}
                />
              </View>

              {formIsInvalid && (
                <Text style={styles.errorText}>
                  Invalid input values - please check your entered data!
                </Text>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={submitHandler}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Workouts")}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
    </View>
  );
}

export default ManageWorkout;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 0,
    right: 1,

    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  exerciseLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseLabel: {
    //marginLeft: 0,
    //marginRight: 5,
    fontSize: 18,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  scrollView: {
    maxWidth: "69%", 
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "space-between",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 0,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: "black",
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 18,
  },
  exerciseContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "98%",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseContent: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
  inputText: {
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 0,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginBottom: 10,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    margin: 8,
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: "#ffb6c1",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  errorText: {
    color: "black",
    textAlign: "center",
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  wrapper1: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  container1: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 60,
  },
  headerContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerButton1: {
    padding: 5,
  },
  headerButtonText1: {
    fontSize: 18,
  },
  headerSpace1: {
    flex: 1,
  },
  input1: {
    height: 60,
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
    width: "100%",
    fontSize: 30,
    fontWeight: "bold",
  },
  smallInput1: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "20%",
    alignSelf: "center",
  },
  itemContainer1: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "space-between",
  },
  itemContainer2: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "flex-start",
  },
  text1: {
    marginRight: 5,
    alignSelf: "center",
  },
  button1: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText1: {
    color: "black",
    fontSize: 18,
  },
  checkbox1: {
    borderWidth: 1,
    borderColor: "black",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  checkboxText1: {
    fontSize: 18,
  },
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
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
});
