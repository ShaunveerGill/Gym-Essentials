//AboutYou.js
import { useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth } from "../firebase";
import { getDatabase, ref, push, set } from "firebase/database";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";


function AboutYou() {
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
    activityLevel
  } = useContext(UserContext);

  const handleGender = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleGoal = (selectedGoal) => {
    setGoal(selectedGoal);
  };

  const handleActivityLevel = (selectedActivityLevel) => {
    console.log(selectedActivityLevel);
    setActivityLevel(selectedActivityLevel);
  };

  const handleFinishButtonPress = () => {
    // Check for the current user
    const user = auth.currentUser;

    if (user) {
      const userData = {
        email: userEmail,
        name: userName,
        gender: gender,
        age: age,
        height: height,
        weight: weight,
        goal: goal,
        activityLevel: activityLevel,
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

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>About You</Text>
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

          <View>
            <Text style={styles.questions}>What is your age?</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setAge(text)}
          />
          <View>
            <Text style={styles.questions}>What is your height?</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setHeight(text)}
          />
          <View>
            <Text style={styles.questions}>What is your weight?</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setWeight(text)}
          />

          <View>
            <Text style={styles.questions}>What is your goal?</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor: goal === "Lose Weight" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => handleGoal("Lose Weight")}
          >
            <Text style={styles.buttonText}>Lose Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor: goal === "Gain Weight" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => handleGoal("Gain Weight")}
          >
            <Text style={styles.buttonText}>Gain Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor:
                  goal === "Maintain Weight" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => handleGoal("Maintain Weight")}
          >
            <Text style={styles.buttonText}>Maintain Weight</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.questions}>What is your activity level?</Text>
          </View>

          <TouchableOpacity
      style={[
        styles.buttonGoals,
        { backgroundColor: activityLevel === "1.2" ? "#ffffff" : "#cccccc" },
      ]}
      onPress={() => handleActivityLevel("1.2")}
    >
      <Text style={styles.activityButtonText}>
        Sedentary (little to no exercise)
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.buttonGoals,
        { backgroundColor: activityLevel === "1.375" ? "#ffffff" : "#cccccc" },
      ]}
      onPress={() => handleActivityLevel("1.375")}
    >
      <Text style={styles.activityButtonText}>
        Lightly active (exercise 1-3 days/week)
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.buttonGoals,
        { backgroundColor: activityLevel === "1.55" ? "#ffffff" : "#cccccc" },
      ]}
      onPress={() => handleActivityLevel("1.55")}
    >
      <Text style={styles.activityButtonText}>
        Moderately active (exercise 3-5 days/week)
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.buttonGoals,
        { backgroundColor: activityLevel === "1.725" ? "#ffffff" : "#cccccc" },
      ]}
      onPress={() => handleActivityLevel("1.725")}
    >
      <Text style={styles.activityButtonText}>
        Very active (exercise 6-7 days/week)
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.buttonGoals,
        { backgroundColor: activityLevel === "1.9" ? "#ffffff" : "#cccccc" },
      ]}
      onPress={() => handleActivityLevel("1.9")}
    >
      <Text style={styles.activityButtonText}>
        Extra active (very active and physical job)
      </Text>
    </TouchableOpacity>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinishButtonPress}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "left",
    justifyContent: "center",
    padding: 20,
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
});

export default AboutYou;
