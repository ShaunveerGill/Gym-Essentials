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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { AboutYouFinishHandler } from "../../data/userServices";

function AboutYou() {
  const navigation = useNavigation();
  const UserCtx = useContext(UserContext);

  const [tempAge, setTempAge] = useState('');
  const [tempHeight, setTempHeight] = useState('');
  const [tempWeight, setTempWeight] = useState('');
  
  const [Sub, setSub] = useState(false);

  const ageIsValid = !isNaN(tempAge) && tempAge > 0 && tempAge < 130;
  const weightIsValid = !isNaN(tempWeight) && tempWeight > 0 && tempWeight < 1000;
  const heightIsValid = !isNaN(tempHeight) && tempHeight > 0 && tempHeight < 274.32;
  const formIsInvalid = !ageIsValid || !heightIsValid || !weightIsValid;

  const handleFinishButtonPress = async () => {
    console.log(ageIsValid);
    console.log(weightIsValid);
    console.log(heightIsValid);
    console.log(formIsInvalid);
    setSub(true);
    if (formIsInvalid) {
      Alert.alert("Input invalid", "Please check your input values");
      return;
    }

    try {
      const age = parseInt(tempAge);
      const height = parseFloat(tempHeight);
      const weight = parseFloat(tempWeight);

      UserCtx.setAge(age);
      UserCtx.setHeight(height);
      UserCtx.setWeight(weight);

    } catch (error) {
      console.error("Error finishing AboutYou:", error);
    }
  };

  useEffect(() => {
    if (Sub && UserCtx.age && UserCtx.height && UserCtx.weight && UserCtx.gender && UserCtx.goal && UserCtx.activityLevel) {
      AboutYouFinishHandler(UserCtx)
        .then(() => navigation.navigate("FeaturesOverview"))
        .catch((error) => console.error("Error finishing AboutYou:", error));
    }

    if (Sub && (!isNaN(tempAge) || !isNaN(tempHeight) || !isNaN(tempWeight))) {
      setSub(false);
    }
  }, [Sub, UserCtx.age, UserCtx.height, UserCtx.weight, UserCtx.gender, UserCtx.goal, UserCtx.activityLevel, tempAge, tempHeight, tempWeight]);

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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: UserCtx.gender === "Male" ? "#ffffff" : "#cccccc" },
              ]}
              onPress={() => UserCtx.setGender("Male")}
            >
              <Text style={styles.buttonText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: UserCtx.gender === "Female" ? "#ffffff" : "#cccccc",
                },
              ]}
              onPress={() => UserCtx.setGender("Female")}
            >
              <Text style={styles.buttonText}>Female</Text>
            </TouchableOpacity>
          </View>
          {!UserCtx.gender && Sub && (
            <Text style={styles.errorText}>No Gender selected</Text>
          )}
          <View>
            <Text style={styles.questions}>What is your age?</Text>
          </View>
          <TextInput
            style={[styles.input, Sub && !UserCtx.age && styles.invalidInput, Sub && !ageIsValid && styles.invalidInput]}
            onChangeText={(text) => setTempAge(text)}
            keyboardType="numeric"
          />
          <View>
            <Text style={styles.questions}>What is your height(cm)?</Text>
          </View>
          <TextInput
            style={[styles.input, Sub && !UserCtx.height && styles.invalidInput,  Sub && !heightIsValid && styles.invalidInput]}
            onChangeText={(text) => setTempHeight(text)}
            keyboardType="numeric"
          />
          <View>
            <Text style={styles.questions}>What is your weight(lb)?</Text>
          </View>
          <TextInput
            style={[styles.input, Sub && !UserCtx.weight && styles.invalidInput, Sub && !weightIsValid && styles.invalidInput]}
            onChangeText={(text) => setTempWeight(text)}
            keyboardType="numeric"
          />
          {Sub && formIsInvalid && (
            <Text style={styles.errorText}>
              Invalid input values - please check your entered data!
            </Text>
          )}
          <View>
            <Text style={styles.questions}>What is your goal?</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor: UserCtx.goal === "Lose Weight" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => UserCtx.setGoal("Lose Weight")}
          >
            <Text style={styles.buttonText}>Lose Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor: UserCtx.goal === "Gain Weight" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => UserCtx.setGoal("Gain Weight")}
          >
            <Text style={styles.buttonText}>Gain Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor:
                UserCtx.goal === "Maintain Weight" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => UserCtx.setGoal("Maintain Weight")}
          >
            <Text style={styles.buttonText}>Maintain Weight</Text>
          </TouchableOpacity>
          {!UserCtx.goal && Sub && (
            <Text style={styles.errorText}>No Goal selected</Text>
          )}
          <View>
            <Text style={styles.questions}>What is your activity level?</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor:
                UserCtx.activityLevel === "Sedentary" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() =>  UserCtx.setActivityLevel("Sedentary")}
          >
            <Text style={styles.activityButtonText}>
              Sedentary (little to no exercise)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor:
                UserCtx.activityLevel === "Lightly active" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => UserCtx.setActivityLevel("Lightly active")}
          >
            <Text style={styles.activityButtonText}>
              Lightly active (exercise 1-3 days/week)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor:
                UserCtx.activityLevel === "Moderately active" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() =>  UserCtx.setActivityLevel("Moderately active")}
          >
            <Text style={styles.activityButtonText}>
              Moderately active (exercise 3-5 days/week)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor:
                UserCtx.activityLevel === "Very active" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() =>  UserCtx.setActivityLevel("Very active")}
          >
            <Text style={styles.activityButtonText}>
              Very active (exercise 6-7 days/week)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonGoals,
              {
                backgroundColor:
                UserCtx.activityLevel === "Extra active" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => UserCtx.setActivityLevel("Extra active")}
          >
            <Text style={styles.activityButtonText}>
              Extra active (very active and physical job)
            </Text>
          </TouchableOpacity>
          {!UserCtx.activityLevel && Sub && (
            <Text style={styles.errorText}>No Activity selected</Text>
          )}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinishButtonPress}
            >
              <Text style={styles.finishbuttonText}>Finish</Text>
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginTop: 90,
    marginBottom: 40,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: "100%",
    borderRadius: 5,
  },
  buttons: {
    width: "100%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },

  invalidInput: {
    backgroundColor: "#ffb6c1",
  },

  finishButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginBottom: 30,
    marginTop: 30,
    marginLeft: 85,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  finishbuttonText: {
    color: "black",
    fontSize: 18,
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
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AboutYou;
