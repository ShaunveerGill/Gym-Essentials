import React, { useContext } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

function AgeEdit() {
  const navigation = useNavigation();

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
    goal,
  } = useContext(UserContext);

  const handleAge = (selectedAge) => {
    setAge(selectedAge);
  };

  const saveAndNavigate = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const databaseRef = firebase.database().ref("users/" + uid);
    databaseRef
      .update({
        age: age,
      })
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

    console.log("age: ", age);
    navigation.navigate("FeaturesOverview");
  };

  const handleAccountPress = () => {
    console.log("Going back to AccountScreen");
    navigation.navigate("AccountScreen");
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Editing</Text>
          </View>

          <View style={styles.center}>
            <Text style={styles.questions}>What is your age?</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => setAge(text)}
            />
          </View>

          <TouchableOpacity style={styles.save} onPress={saveAndNavigate}>
            <View>
              <Text style={styles.buttonText}> Save </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    marginRight: 10,
  },
  inputBox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: "100%",
   
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  questions: {
    marginBottom: 10,
  },
  save: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    alignSelf: "center",
  },
});

export default AgeEdit;
