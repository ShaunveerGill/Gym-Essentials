import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { auth } from "../../../firebase";
import { confirmExerciseHandler } from "../../data/userServices";
import { useExerciseInputs } from "../../controller/UserController";

function EditExercise({ route }) {
  const workoutsCtx = useContext(WorkoutsContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { currentEditId } = route.params;
  const navigation = useNavigation();
  const user = auth.currentUser;
  const editedExerciseId = route.params?.exerciseId;
  const isEditing = !!editedExerciseId;

  
  const selectedExercise = workoutsCtx.workouts.reduce((selected, workout) => {
    const exercise = workout.exercises.find((ex) => ex.id === editedExerciseId);
    if (exercise) {
      selected = exercise;
    }
    return selected;
  }, null);

  const {inputs, setExerciseInputs , inputChangedHandler} = useExerciseInputs(selectedExercise);

  
  async function submitHandler() {
    const exerciseData = {
      exerciseName: inputs.exerciseName.value, 
      sets: inputs.sets.value,
      reps: inputs.reps.value,
    };
  
    const exerciseNameIsValid = exerciseData.exerciseName.trim().length > 0;
    const setsIsValid = exerciseData.sets.trim().length > 0;
    const repsIsValid = exerciseData.reps.trim().length > 0;
  
    if (!exerciseNameIsValid || !setsIsValid || !repsIsValid) {
      setExerciseInputs((curInputs) => {
        return {
          exerciseName: {
            value: curInputs.exerciseName.value,
            isValid: exerciseNameIsValid,
          },
          sets: { value: curInputs.sets.value, isValid: setsIsValid },
          reps: { value: curInputs.reps.value, isValid: repsIsValid },
        };
      });
      return;
    }
    
    setIsSubmitting(true);
  
    try {
      await confirmExerciseHandler(
        exerciseData,
        user.uid,
        currentEditId,
        workoutsCtx,
        editedExerciseId,
        setError,
        setIsSubmitting,
        isEditing
      );
  
      navigation.goBack();
    } catch (error) {
      setError("Could not add exercise - please try again later!");
      setIsSubmitting(false);
    }
  }
  
  const formIsInvalid =
    !inputs.exerciseName.isValid ||
    !inputs.sets.isValid ||
    !inputs.reps.isValid;

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

  return (
    <View style={styles.isEditingcontainer}>
      {isEditing ? (
        <>
          <View style={styles.wrapper1}>
            <View style={styles.container}>
              <Text style={styles.title2}>Editing Exercise</Text>
              <View style={styles.itemContainer1}>
                <Text
                  style={[
                    styles.text1,
                    !inputs.exerciseName.isValid && styles.invalidLabel,
                  ]}
                >
                  Exercise:
                </Text>
                <TextInput
                  style={[
                    styles.exerciseInput,
                    !inputs.exerciseName.isValid && styles.invalidInput,
                  ]}
                  value={inputs.exerciseName.value}
                  onChangeText={(text) =>
                    inputChangedHandler("exerciseName", text)
                  }
                />
              </View>

              <View style={styles.itemContainer1}>
                <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      !inputs.sets.isValid && styles.invalidLabel,
                    ]}
                  >
                    Sets:
                  </Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      keyboardType="numeric"
                      style={[
                        styles.smallInput,
                        !inputs.sets.isValid && styles.invalidInput,
                      ]}
                      value={inputs.sets.value}
                      onChangeText={(text) => inputChangedHandler("sets", text)}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      !inputs.reps.isValid && styles.invalidLabel,
                    ]}
                  >
                    Reps:
                  </Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      keyboardType="numeric"
                      style={[
                        styles.smallInput,
                        !inputs.reps.isValid && styles.invalidInput,
                      ]}
                      value={inputs.reps.value}
                      onChangeText={(text) => inputChangedHandler("reps", text)}
                    />
                  </View>
                </View>
              </View>

              {formIsInvalid && (
                <Text style={styles.errorText}>
                  Invalid input values - please check your entered data!
                </Text>
              )}

              <TouchableOpacity style={styles.button1} onPress={submitHandler}>
                <Text style={styles.buttonText1}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button1}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText1}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.wrapper1}>
            <View style={styles.container}>
              <View style={styles.header2}>
                <Text style={styles.title2}>Adding Exercise</Text>
              </View>
              <View style={styles.itemContainer1}>
                <Text
                  style={[
                    styles.text1,
                    !inputs.exerciseName.isValid && styles.invalidLabel,
                  ]}
                >
                  Exercise:
                </Text>
                <TextInput
                  style={[
                    styles.exerciseInput,
                    !inputs.exerciseName.isValid && styles.invalidInput,
                  ]}
                  onChangeText={(text) =>
                    inputChangedHandler("exerciseName", text)
                  }
                />
              </View>

              <View style={styles.itemContainer1}>
                <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      !inputs.sets.isValid && styles.invalidLabel,
                    ]}
                  >
                    Sets:
                  </Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[
                        styles.smallInput,
                        !inputs.sets.isValid && styles.invalidInput,
                      ]}
                      onChangeText={(text) => inputChangedHandler("sets", text)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      !inputs.reps.isValid && styles.invalidLabel,
                    ]}
                  >
                    Reps:
                  </Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      keyboardType="numeric"
                      style={[
                        styles.smallInput,
                        !inputs.reps.isValid && styles.invalidInput,
                      ]}
                      onChangeText={(text) => inputChangedHandler("reps", text)}
                    />
                  </View>
                </View>
              </View>

              {formIsInvalid && (
                <Text style={styles.errorText}>
                  Invalid input values - please check your entered data!
                </Text>
              )}

              <TouchableOpacity style={styles.button1} onPress={submitHandler}>
                <Text style={styles.buttonText1}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button1}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText1}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseInput: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "80%",
  },
  exerciseLabel: {
    marginLeft: 0,
    marginRight: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "space-between",
  },
  label: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallInput: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: 60,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 40,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: "black",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 18,
  },
  exerciseContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  exerciseContent: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  text: {
    marginLeft: 40,
  },
  inputText: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: "80%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: 36,
    marginBottom: 10,
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
    padding: 20,
  },
  container1: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  headerContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
    width: "100%",
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "space-between",
  },
  text1: {
    marginRight: 5,
    alignSelf: "center",
  },
  button1: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 30,
    shadowColor: "#000", 
    shadowOffset: {
      width: 2, 
      height: 5, 
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84, 
    elevation: 5, 
  },
  buttonText1: {
    color: "white",
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
  title2: {
    fontSize: 40,
    marginRight: 10,
    paddingBottom: 30,
  },
  isEditingcontainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default EditExercise;
