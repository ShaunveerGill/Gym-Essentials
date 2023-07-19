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

function ActivityEdit() {
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
    setActivityLevel,
    activityLevel,
  } = useContext(UserContext);

  const handleActivityLevel = (selectedActivityLevel) => {
    setActivityLevel(selectedActivityLevel);
  };

  const saveAndNavigate = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const databaseRef = firebase.database().ref("users/" + uid);
    databaseRef
      .update({
        activityLevel: activityLevel,
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
            <Text style={styles.questions}>What is your activity level?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    activityLevel === "Sedentary" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleActivityLevel("Sedentary")}
            >
              <Text style={styles.buttonText}>
                Sedentary (little to no exercise)
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    activityLevel === "Lightly active" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleActivityLevel("Lightly active")}
            >
              <Text style={styles.buttonText}>
                Lightly active (exercise 1-3 days/week)
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    activityLevel === "Moderately active" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleActivityLevel("Moderately active")}
            >
              <Text style={styles.buttonText}>
                Moderately active (exercise 3-5 days/week)
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    activityLevel === "Very active" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleActivityLevel("Very active")}
            >
              <Text style={styles.buttonText}>
                Very active (exercise 6-7 days/week)
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    activityLevel === "Extra active" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleActivityLevel("Extra active")}
            >
              <Text style={styles.buttonText}>
                Extra active (very active and physical job)
              </Text>
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

export default ActivityEdit;