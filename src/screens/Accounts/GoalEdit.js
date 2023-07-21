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
import { updateData } from "../../data/userServices";

function GoalEdit() {
  const navigation = useNavigation();
  const UserCtx = useContext(UserContext);

  const saveAndNavigate = () => {
    updateData("goal", UserCtx.goal);
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
                  UserCtx.goal === "Lose Weight" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => UserCtx.setGoal("Lose Weight")}
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
                  UserCtx.goal === "Gain Weight" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => UserCtx.setGoal("Gain Weight")}
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
                  UserCtx.goal === "Maintain Weight" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => UserCtx.setGoal("Maintain Weight")}
            >
              <Text style={styles.buttonText}>Maintain Weight</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.save} onPress={saveAndNavigate}>
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
