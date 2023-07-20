import firebase from "firebase/compat/app";
import "firebase/compat/database";

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



// export const handleLogin = () => {
//     auth
//       .signInWithEmailAndPassword(userEmail, password)
//       .then(userCredentials => {
//         const user = userCredentials.user;
//         const userData = auth.currentUser;
//         if (userData !== null) {
//           setUserEmail(userData.email);
//           const db = getDatabase();
//           const userRef = ref(db, "users/" + userData.uid);
//           onValue(userRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data !== null) {
//               setUserName(data.name);
//               setGender(data.gender);
//               setAge(data.age);
//               setHeight(data.height);
//               setWeight(data.weight);
//               setGoal(data.goal);
//               setActivityLevel(data.activityLevel);
//             }
//           });
//           setPassword('');
//           navigation.navigate('FeaturesOverview');
//         }
//       })
//       .catch(error => alert(error.message))
// }
// const handleFinishButtonPress = () => {
//     // Check for the current user
//     // if (!Incomplete) {
//     setSub(true);

//     const user = auth.currentUser;
//     verification = true;

//     if (
//       gender &&
//       userName &&
//       age &&
//       height &&
//       weight &&
//       goal &&
//       activityLevel
//     ) {
//       if (user) {
//         const userData = {
//           email: userEmail,
//           name: userName,
//           gender: gender,
//           age: age,
//           height: height,
//           weight: weight,
//           goal: goal,
//           activityLevel: activityLevel,
//         };

//         const db = getDatabase();
//         const userRef = ref(db, "users/" + user.uid);

//         set(userRef, userData)
//           .then(() => {
//             navigation.navigate("FeaturesOverview");
//           })
//           .catch((error) => {
//             console.error("Error saving user data: ", error);
//           });
//       } else {
//         console.error("No user is signed in");
//       }
//     }
//   };