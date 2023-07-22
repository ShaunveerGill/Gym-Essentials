import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { auth } from "../../firebase";
import { getDatabase, ref, onValue, set} from "firebase/database";
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

export const handleSignUp = async (userEmail, Cpassword) => {
  try {
    const userCredentials = await auth.createUserWithEmailAndPassword(userEmail, Cpassword);
    const user = userCredentials.user;
    return user;
  } catch (error) {
    throw error;
  }
};

// ... (other imports)

export const handleLogin = async (userEmail, password, UserCtx) => {
  if (!userEmail) {
    return Promise.reject(new Error("User email is missing."));
  }

  UserCtx.setUserEmail(userEmail);

  try {
    const userCredentials = await auth.signInWithEmailAndPassword(userEmail, password);
    const user = userCredentials.user;
    const userData = auth.currentUser;

    if (userData !== null) {
      const db = getDatabase();
      const userRef = ref(db, "users/" + userData.uid);

      return new Promise((resolve, reject) => {
        onValue(
          userRef,
          (snapshot) => {
            const data = snapshot.val();

            if (data !== null) {
              UserCtx.setUserName(data.name);
              UserCtx.setGender(data.gender);
              UserCtx.setAge(data.age);
              UserCtx.setHeight(data.height);
              UserCtx.setWeight(data.weight);
              UserCtx.setGoal(data.goal);
              UserCtx.setActivityLevel(data.activityLevel);
            }

            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else {
      throw new Error("User data is null.");
    }
  } catch (error) {
    const errorMessage = error.message || "An error occurred during login.";
    // Instead of using alert, you can set the error message in the UserCtx or display it in a modal.
    UserCtx.setErrorMessage(errorMessage);
    throw error;
  }
};

// export const handleLogin = (userEmail, password, UserCtx) => {
//   if (!userEmail) {
//     return Promise.reject(new Error("User email is missing."));
//   }

//   UserCtx.setUserEmail(userEmail);

//   return new Promise((resolve, reject) => {
//     auth.signInWithEmailAndPassword(userEmail, password) 
//       .then((userCredentials) => {
//         const user = userCredentials.user;
//         const userData = auth.currentUser;

//         if (userData !== null) {
//           const db = getDatabase();
//           const userRef = ref(db, "users/" + userData.uid);

//           onValue(
//             userRef,
//             (snapshot) => {
//               const data = snapshot.val();

//               if (data !== null) {
//                 UserCtx.setUserName(data.name);
//                 UserCtx.setGender(data.gender);
//                 UserCtx.setAge(data.age);
//                 UserCtx.setHeight(data.height);
//                 UserCtx.setWeight(data.weight);
//                 UserCtx.setGoal(data.goal);
//                 UserCtx.setActivityLevel(data.activityLevel);
//               }

//               resolve();
//             },
//             (error) => {
//               reject(error); 
//             }
//           );
//         } else {
//           reject(new Error("User data is null.")); 
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.message || "An error occurred during login.";
//         alert(errorMessage);
//         reject(error); 
//       });
//   });
// };

export const handleLogout = () => {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => reject(error));
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
    return workouts;
  } catch (error) {
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

export async function AboutYouFinishHandler(UserCtx) {
  const user = auth.currentUser;

  if (
    UserCtx.gender &&
    UserCtx.userName &&
    UserCtx.age &&
    UserCtx.height &&
    UserCtx.weight &&
    UserCtx.goal &&
    UserCtx.activityLevel
  ) {
    if (user) {
      const userData = {
        email: UserCtx.userEmail,
        name: UserCtx.userName,
        gender: UserCtx.gender,
        age: UserCtx.age,
        height: UserCtx.height,
        weight: UserCtx.weight,
        goal: UserCtx.goal,
        activityLevel: UserCtx.activityLevel,
      };

      try {
        const db = getDatabase();
        const userRef = ref(db, "users/" + user.uid);

        await set(userRef, userData);
        // Resolve when successful
        return;
      } catch (error) {
        console.error("Error saving user data: ", error);
        // Reject with the error
        throw error;
      }
    } else {
      console.error("No user is signed in");
      // Reject with a new error
      throw new Error("No user is signed in");
    }
  } else {
    // Reject with a new error
    throw new Error("Incomplete user data");
  }
}

export async function fetchRecords(UserUid) {
  const response = await axios.get(
    BACKEND_URL + "/users/" + UserUid + "/personalrecords.json"
  );
  const records = [];

  for (const key in response.data) {
    const recordObj = {
      id: key,
      exercise: response.data[key].exercise,
      record: response.data[key].record,
      date: new Date(response.data[key].date),
    };
    records.push(recordObj);
  }

  return records;
}

export async function WorkoutListsHandler(workoutName, userUid, workoutsCtx, WorkoutsData) {
  const selectedWorkoutData = WorkoutsData.find(
    (workout) => workout.workoutName === workoutName
  );

  const tempObj = {
    workoutName: workoutName,
    exercises: [],
  };

  const response = await axios.post(
    BACKEND_URL + "/users/" + userUid + "/workouts.json",
    tempObj
  );
  const workoutId = response.data.name;

  for (let i = 0; i < selectedWorkoutData.exercises.length; i++) {
    const responseTwo = await axios.post(
      BACKEND_URL +
        "/users/" +
        userUid +
        "/workouts/" +
        workoutId +
        "/exercises.json",
      selectedWorkoutData.exercises[i]
    );
    const exerciseId = responseTwo.data.name;
    selectedWorkoutData.exercises[i].id = exerciseId;
    tempObj.exercises.push(selectedWorkoutData.exercises[i]);
  }

  tempObj.id = workoutId;
  workoutsCtx.addWorkout(tempObj);
}
