import React, { useContext } from "react";
import {
  Text,
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

function GenderEdit() {
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

  const handleGender = (selectedGender) => {
    setGender(selectedGender);
  };

  const saveAndNavigate = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const databaseRef = firebase.database().ref("users/" + uid);
    databaseRef
      .update({
        gender: gender,
      })
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

    navigation.navigate("FeaturesOverview");
  };

  const handleAccountPress = () => {
    navigation.navigate("AccountScreen");
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Editing</Text>
          </View>
          <View>
            <Text style={styles.questions}>
              What is your gender to calculate your calorie?
            </Text>
          </View>
          {/*Changed code for when you want change the gender selections*/}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: gender === "Male" ? "#ffffff" : "#cccccc" },
              ]}
              onPress={() => handleGender("Male")}
            >
              <Text style={styles.buttonText}>Male</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: gender === "Female" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleGender("Female")}
            >
              <Text style={styles.buttonText}>Female</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.save} onPress={saveAndNavigate}>
            <View>
              <Text style={styles.buttonText}> Save </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },

  container: {
    flexDirection: "col",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    marginTop: 40,
    fontSize: 40,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: "100%",
  },
  buttons: {
    width: "100%",
  },
  finishButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  activityButtonText: {
    color: "black",
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  buttonGoals: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    marginTop: 5,
  },
  questions: {
    marginBottom: 10,
  },
  save: {
    backgroundColor: "#cccccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,

    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
});

export default GenderEdit;
