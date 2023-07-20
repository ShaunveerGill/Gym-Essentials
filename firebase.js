
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCU8SbBfPxLh_X0KAQeZIHqR05Rol5VMlY",
  authDomain: "gym-essentials.firebaseapp.com",
  databaseURL: "https://gym-essentials-default-rtdb.firebaseio.com",
  projectId: "gym-essentials",
  storageBucket: "gym-essentials.appspot.com",
  messagingSenderId: "431646921488",
  appId: "1:431646921488:web:f9098b6e5d6421aaee8b95"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };