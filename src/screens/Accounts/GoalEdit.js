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
import { UserContext } from "../../context/UserContext";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

function GoalEdit() {
  const navigation = useNavigation();
  const { setGoal, goal } = useContext(UserContext);

  const handleGoal = (selectedGoal) => {
    setGoal(selectedGoal);
  };

  const updateDatabase = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const databaseRef = firebase.database().ref("users/" + uid);
    databaseRef
      .update({
        goal: goal,
      })
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    navigation.navigate("FeaturesOverview");
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Editing</Text>
          </View>
          <View>
            <Text style={styles.questions}>What are your gym goals ?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    goal === "Lose Weight" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleGoal("Lose Weight")}
            >
              <Text style={styles.buttonText}>Lose Weight</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    goal === "Gain Weight" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleGoal("Gain Weight")}
            >
              <Text style={styles.buttonText}>Gain Weight</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    goal === "Maintain Weight" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => handleGoal("Maintain Weight")}
            >
              <Text style={styles.buttonText}>Maintain Weight</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.save} onPress={updateDatabase}>
            <View>
              <Text style={styles.saveButtonText}> Save </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={() => navigation.goBack()}>
            <Text style={styles.saveButtonText}>Cancel</Text>
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
    marginTop: 200,
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
  saveButtonText:{
    color: "white",
    fontSize: 18,
  },
  activityButtonText: {
    color: "black",
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
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
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
});

export default GoalEdit;
