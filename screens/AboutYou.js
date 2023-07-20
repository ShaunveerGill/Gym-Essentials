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
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
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
    activityLevel,
  } = useContext(UserContext);

  const formIsInvalid = (!weight || !height || !age) && Sub;
  const [Sub, setSub] = useState(false);

  const handleGender = (selectedGender) => {
    IncompleteGender = false;
    setGender(selectedGender);
  };

  const handleGoal = (selectedGoal) => {
    setGoal(selectedGoal);
  };

  const handleActivityLevel = (selectedActivityLevel) => {
    setActivityLevel(selectedActivityLevel);
  };

  const handleFinishButtonPress = () => {
    setSub(true);

    const user = auth.currentUser;
    verification = true;

    if (
      gender &&
      userName &&
      age &&
      height &&
      weight &&
      goal &&
      activityLevel
    ) {
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
            navigation.navigate("FeaturesOverview");
          })
          .catch((error) => {
            console.error("Error saving user data: ", error);
          });
      } else {
        console.error("No user is signed in");
      }
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
          {!gender && Sub && (
            <Text style={styles.errorText}>No Gender selected</Text>
          )}
          <View>
            <Text style={styles.questions}>What is your age?</Text>
          </View>
          <TextInput
            style={[styles.input, Sub && !age && styles.invalidInput]}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
          <View>
            <Text style={styles.questions}>What is your height(cm)?</Text>
          </View>
          <TextInput
            style={[styles.input, Sub && !height && styles.invalidInput]}
            onChangeText={(text) => setHeight(text)}
            keyboardType="numeric"
          />
          <View>
            <Text style={styles.questions}>What is your weight(lb)?</Text>
          </View>
          <TextInput
            style={[styles.input, Sub && !weight && styles.invalidInput]}
            onChangeText={(text) => setWeight(text)}
            keyboardType="numeric"
          />
          {formIsInvalid && (
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
          {!goal && Sub && (
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
                  activityLevel === "Sedentary" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => handleActivityLevel("Sedentary")}
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
                  activityLevel === "Lightly active" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => handleActivityLevel("Lightly active")}
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
                  activityLevel === "Moderately active" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => handleActivityLevel("Moderately active")}
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
                  activityLevel === "Very active" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => handleActivityLevel("Very active")}
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
                  activityLevel === "Extra active" ? "#ffffff" : "#cccccc",
              },
            ]}
            onPress={() => handleActivityLevel("Extra active")}
          >
            <Text style={styles.activityButtonText}>
              Extra active (very active and physical job)
            </Text>
          </TouchableOpacity>
          {!activityLevel && Sub && (
            <Text style={styles.errorText}>No Activity selected</Text>
          )}
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
    backgroundColor: "#cccccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginBottom: 10,
    marginTop: 50,
    marginLeft: 85,
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
