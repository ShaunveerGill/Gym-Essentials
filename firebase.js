// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU8SbBfPxLh_X0KAQeZIHqR05Rol5VMlY",
  authDomain: "gym-essentials.firebaseapp.com",
  databaseURL: "https://gym-essentials-default-rtdb.firebaseio.com",
  projectId: "gym-essentials",
  storageBucket: "gym-essentials.appspot.com",
  messagingSenderId: "431646921488",
  appId: "1:431646921488:web:f9098b6e5d6421aaee8b95"
};

// Initialize Firebase
// following code is based off of the YouTube video, syntax may be outdated!!
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }


// const auth = getAuth(app);


// export { auth };

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };