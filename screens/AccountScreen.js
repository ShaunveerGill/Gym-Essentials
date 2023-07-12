import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import InformationScreen from "./InformationScreen";
import SettingsScreen from "./SettingsScreen";
import { UserContext, UserContextProvider } from "../UserContext";
import { useContext } from "react";

import { TextInput } from "react-native-gesture-handler";
const AccountStack = createNativeStackNavigator();

const AccountScreen = ({ navigation }) => {
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

  const handleFinishButtonPress = () => {
    // Check for the current user
    const user = auth.currentUser;

    if (user) {
      const userData = {
        gender: gender,
        age: age,
        height: height,
        weight: weight,
        goal: goal,
      };

      const db = getDatabase();
      const userRef = ref(db, "users/" + user.uid);

      set(userRef, userData)
        .then(() => {
          console.log("User data saved successfully");
          navigation.navigate("FeaturesOverview");
        })
        .catch((error) => {
          console.error("Error saving user data: ", error);
        });
    } else {
      console.error("No user is signed in");
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name={userEmail} options={{ headerShown: false }}>
        {() => (
          <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Account Information</Text>
            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>User Name: {userName}</Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Email: {userEmail}</Text>
            </View>
            {/*We won't change user name & email*/}

            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Gender: {gender}</Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Age: {age}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAge(text)}
              />
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Height: {height}</Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Weight: {weight}</Text>
            </View>
            <View style={styles.infoBoxes}>
              <Text style={styles.infoboxtext}>Goal: {goal}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinishButtonPress}
              >
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AccountStack.Screen>
      <AccountStack.Screen name="Information" component={InformationScreen} />
      <AccountStack.Screen name="Settings" component={SettingsScreen} />
    </AccountStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  infoBoxes: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  infoboxtext: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AccountScreen;
