import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { auth } from "../../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserContext } from "../context/UserContext";

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
        // Handle authentication errors and show pop-up warning
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
