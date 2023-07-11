import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import InformationScreen from "./InformationScreen";
import SettingsScreen from "./SettingsScreen";
import { UserContext } from "../UserContext";
import { useContext } from "react";


function Workouts() {
  const {
    userEmail,
    setUserEmail,
    userName,
    setUserName,
    gender,
    setGender,
    setAge,
    age,
    setHeight,
    height,
    setWeight,
    weight,
    setGoal,
    goal
  } = useContext(UserContext); 


  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      setUserEmail(user.email);
      const db = getDatabase();
      const userRef = ref(db, "users/" + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setUserName(data.name);
          setGender(data.gender);
          setAge(data.age);
          setHeight(data.height);
          setWeight(data.weight);
          setGoal(data.goal);

        }
      });
    }
  }, []);

  return <Text>Workouts Screen</Text>;
}

export default Workouts;