import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { auth } from "../../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserContext } from "../context/UserContext";
import { WorkoutsContext } from '../context/WorkoutsContext';
import React, { useContext, useState } from "react";
import axios from 'axios';
import { BACKEND_URL } from "../config/config";


export const updateData = (variableName, value) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const databaseRef = firebase.database().ref("users/" + uid);

  const updateData = {};
  updateData[variableName] = value;

  return databaseRef
    .update(updateData)
    .then(() => {
      console.log(`${variableName} updated successfully with value ${value}`);
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
};

export const handleLogin = (userEmail, password, setUserEmail, setUserName, setGender, setAge, setHeight, setWeight, setGoal, setActivityLevel) => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(userEmail, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const userData = auth.currentUser;

        if (userData !== null) {
          setUserEmail(userData.email);
          const db = getDatabase();
          const userRef = ref(db, "users/" + userData.uid);

          onValue(
            userRef,
            (snapshot) => {
              const data = snapshot.val();

              if (data !== null) {
                setUserName(data.name);
                setGender(data.gender);
                setAge(data.age);
                setHeight(data.height);
                setWeight(data.weight);
                setGoal(data.goal);
                setActivityLevel(data.activityLevel);
              }

              resolve();
            },
            (error) => {
              reject(error); 
            }
          );
        }
      })
      .catch((error) => {
        const errorMessage = error.message || "An error occurred during login.";
        alert(errorMessage);
        reject(error); // Reject the Promise with the error
      });
  });
};

export const handleSignUp = (userEmail, Cpassword) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(userEmail, Cpassword)
      .then(userCredentials => {
        const user = userCredentials.user;
        resolve(user); 
      })
      .catch(error => reject(error));
  });
};

export const handleLogout = () => {
  return new Promise((resolve, reject) => {
  auth
    .signOut()
    .then(() => {
      console.log("User signed out");
      resolve();
    })
    .catch(error => reject(error));
  });
};

export async function fetchWorkouts(userUid) {
  try {
    const response = await axios.get(
      BACKEND_URL + '/users/' + userUid + '/workouts.json'
    );

    const workouts = [];

    for (const workoutId in response.data) {
      const workoutData = response.data[workoutId];
      const exercises = await fetchExercises(userUid, workoutId); 

      const workoutObj = {
        id: workoutId,
        workoutName: workoutData.workoutName,
        exercises: exercises,
      };
      workouts.push(workoutObj);
    }
    console.log(workouts);
    return workouts;
  } catch (error) {
    console.log('Error fetching workouts:', error);
    throw error;
  }
}

export async function fetchExercises(userUid, workoutId) {
  try {
    const response = await axios.get(
      BACKEND_URL + '/users/' + userUid + '/workouts/' + workoutId + '/exercises.json'
    );

    const exercises = [];

    for (const exerciseId in response.data) {
      const exerciseData = response.data[exerciseId];

      const exerciseObj = {
        id: exerciseId,
        exerciseName: exerciseData.exerciseName,
        sets: exerciseData.sets,
        reps: exerciseData.reps,
      };
      exercises.push(exerciseObj);
    }
    console.log("exercises:");
    console.log(exercises);
    return exercises;
  } catch (error) {
    console.log('Error fetching exercises for workout', workoutId, ':', error);
    throw error;
  }
}

export async function confirmDeleteExercise(
  exerciseId,
  userUid,
  editedWorkoutId,
  setIsSubmitting,
  setError,
  selectedWorkout,
  workoutsCtx
) {
  setIsSubmitting(true);
  try {
    await axios.delete(
      BACKEND_URL +
        "/users/" +
        userUid +
        "/workouts/" +
        editedWorkoutId +
        "/exercises/" +
        exerciseId +
        ".json"
    );

    const updatedExercises = selectedWorkout.exercises.filter(
      (exercise) => exercise.id !== exerciseId
    );

    workoutsCtx.updateWorkout(editedWorkoutId, { ...selectedWorkout, exercises: updatedExercises });

    setIsSubmitting(false);
  } catch (error) {
    setError("Could not delete exercise - please try again later!");
    setIsSubmitting(false);
  }
}

export async function confirmDelete(userUid, editedWorkoutId, setIsSubmitting, setError, workoutsCtx) {
  setIsSubmitting(true);
  try {
    await axios.delete(
      BACKEND_URL +
        "/users/" +
        userUid +
        "/workouts/" +
        editedWorkoutId +
        ".json"
    );
    workoutsCtx.deleteWorkout(editedWorkoutId);
  } catch (error) {
    setError("Could not delete workout - please try again later!");
    setIsSubmitting(false);
  }
}

export async function confirmHandler(
  workoutData,
  userUid,
  editedWorkoutId,
  setIsSubmitting,
  setError,
  workoutsCtx,
  isEditing,
) {
  setIsSubmitting(true);
  try {
    if (isEditing) {
      workoutsCtx.updateWorkout(editedWorkoutId, workoutData);
      await axios.put(
        BACKEND_URL +
          "/users/" +
          userUid +
          "/workouts/" +
          editedWorkoutId +
          ".json",
        workoutData
      );
    } else {
      const response = await axios.post(
        BACKEND_URL + "/users/" + userUid + "/workouts.json",
        workoutData
      );
      const id = response.data.name;
      workoutData.exercises = [];
      workoutData.id = id;
      workoutsCtx.addWorkout(workoutData);
    }
  } catch (error) {
    setError("Could not save data - please try again later!");
    setIsSubmitting(false);
  }
}

export async function storeWorkout(exerciseData, userUid, currentEditId) {
  console.log("hello");
  const response = await axios.post(
    BACKEND_URL +
      "/users/" +
      userUid +
      "/workouts/" +
      currentEditId +
      "/exercises.json",
      exerciseData
  );
  const id = response.data.name;
  exerciseData.exerciseId = id;
  console.log(id);
  return id;
}

export async function confirmExerciseHandler(
  exerciseData,
  userUid,
  currentEditId,
  workoutsCtx,
  editedExerciseId,
  setError,
  setIsSubmitting,
  isEditing 
) {
  try {
    setIsSubmitting(true);
    if (isEditing) {
      const updatedWorkout = workoutsCtx.workouts.find(
        (workout) => workout.id === currentEditId
      );
      const updatedExercises = updatedWorkout.exercises.map((exercise) => {
        if (exercise.id === editedExerciseId) {
          return { ...exercise, ...exerciseData };
        }
        return exercise;
      });
      updatedWorkout.exercises = updatedExercises;
      workoutsCtx.updateWorkout(currentEditId, updatedWorkout);
      await axios.put(
        BACKEND_URL +
          "/users/" +
          userUid +
          "/workouts/" +
          currentEditId +
          "/exercises/" +
          editedExerciseId +
          ".json",
        exerciseData
      );
    } else {
      console.log("hello"); 
      const id = await storeWorkout(exerciseData, userUid, currentEditId);
      workoutsCtx.addExercise(currentEditId, exerciseData, id);
    }
    setIsSubmitting(false); 
  } catch (error) {
    setError("Could not update exercise - please try again later!");
    setIsSubmitting(false); 
    throw error; 
  }
}

export async function deleteRecordsHandler(
  userUid,
  editedRecordId,
  setError,
  setIsSubmitting,
  recordsCtx
) {
  setIsSubmitting(true);
  try {
    await axios.delete(
      BACKEND_URL + '/users/' + userUid + '/personalrecords/' + editedRecordId + '.json'
    );
    recordsCtx.deleteRecord(editedRecordId);
    setIsSubmitting(false);
  } catch (error) {
    setError('Could not delete record - please try again later!');
    setIsSubmitting(false);
  }
}

export async function storeRecord(recordData, userUid) {
  const response = await axios.post(BACKEND_URL + '/users/' + userUid + '/personalrecords.json', recordData);
  const id = response.data.name;
  return id;
}  

export async function confirmRecordsHandler(
  recordData,
  userUid,
  editedRecordId,
  setIsSubmitting,
  setError,
  recordsCtx,
  isEditing 
) {
  setIsSubmitting(true);
  try {
    if (isEditing) {
      recordsCtx.updateRecord(editedRecordId, recordData);
      await axios.put(
        BACKEND_URL +
          "/users/" +
          userUid +
          "/personalrecords/" +
          editedRecordId +
          ".json",
        recordData
      );
    } else {
      const id = await storeRecord(recordData, userUid); // Pass userUid here to storeRecord
      recordsCtx.addRecord({ ...recordData, id: id });
    }
    } catch (error) {
    setError("Could not save data - please try again later!");
    setIsSubmitting(false);
  }
}
