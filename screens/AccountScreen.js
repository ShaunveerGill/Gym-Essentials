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

const AccountStack = createNativeStackNavigator();

const AccountScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

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
      <AccountStack.Screen name="Account" options={{ headerShown: false }}>
        {() => (
          <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Account Information</Text>
            <Text>User Name: {userName}</Text>
            <Text>Email: {userEmail}</Text>
            <Text>Gender: {gender}</Text>
            <Text>Age: {age}</Text>
            <Text>Height: {height}</Text>
            <Text>Weight: {weight}</Text>
            <Text>Goal: {goal}</Text>
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
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
});

export default AccountScreen;
