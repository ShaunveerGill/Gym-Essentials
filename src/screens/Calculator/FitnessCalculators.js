import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from "react-native";
import { UserContext } from "../../context/UserContext";

const LOSE_WEIGHT = -750;
const GAIN_WEIGHT = 375;

// MEN 88.362 + (13.397 * (weightInt / 2.2)) + (4.799 * heightInt) – (5.677 * ageInt)
// WOMEN 447.593 + (9.247 * (weightInt / 2.2)) + (3.098 * heightInt) – (4.330 * ageInt)
function FitnessCalculators() {
  const [calories, setCalories] = useState("0");
  const [protein, setProtein] = useState("0");
  const {
    gender,
    age,
    height,
    weight,
    goal,
    activityLevel
  } = useContext(UserContext);

  useEffect(() => {
    const calculate = () => {
      let weightInt = parseFloat(weight, 10);
      let heightInt = parseFloat(height, 10);
      let ageInt = parseFloat(age, 10);
      let activityLevelInt = 1;

      if (activityLevel === "Sedentary") {
        let activityLevelInt = 1.2;
      } else if (activityLevel === "Lightly active") {
        activityLevelInt = 1.375;
      } else if (activityLevel === "Moderately active") {
        activityLevelInt = 1.55;
      } else if (activityLevel === "Very active") {
        activityLevelInt = 1.725;
      } else {
        activityLevelInt = 1.9;
      }

      let BMR = gender === 'Male'
        ? 88.362 + (13.397 * (weightInt / 2.2)) + (4.799 * heightInt) - (5.677 * ageInt)
        : 447.593 + (9.247 * (weightInt / 2.2)) + (3.098 * heightInt) - (4.330 * ageInt);

      let TDEE = Math.ceil(BMR * activityLevelInt);

      if (goal === "Lose Weight") {
        setCalories(TDEE + LOSE_WEIGHT);
        setProtein(Math.ceil((weightInt / 2.2) * 2.25));
      } else if (goal === "Gain Weight") {
        setCalories(TDEE + GAIN_WEIGHT);
        setProtein(Math.ceil((weightInt / 2.2) * 1.9));
      } else if (goal === "Maintain Weight") {
        setCalories(TDEE);
        setProtein(Math.ceil((weightInt / 2.2) * 1.7));
      }
    };

    calculate();
  }, [gender, age, height, weight, goal, activityLevel]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/TaskBarIcons/logoblack.png")} style={styles.logo} />
      <Text style={styles.title}>Fitness Calculators</Text>
      <View style={styles.button}>
      <Text style={styles.buttonText2}>
        Daily Caloric Intake 
        {"\n"}
        </Text>
        <Text style={styles.buttonText}>
          Based on your fitness goals, your calculated
          <Text style={styles.boldText}> Daily Caloric Intake </Text>
          is:
          {"\n"}
        </Text>
        <Text style={styles.intakeText}>{calories} calories</Text>
      </View>
      <View style={styles.button}>
      <Text style={styles.buttonText2}>
        Daily Protein Intake 
        {"\n"}
        </Text>
        <Text style={styles.buttonText}>
          Based on your fitness goals, your calculated
          <Text style={styles.boldText}> Daily Protein Intake </Text>
          is:
          {"\n"}
        </Text>
        <Text style={styles.intakeText}>{protein} g</Text>
      </View>
    </View>
  );
}

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
    width: "90%",
    marginBottom: 20,
    marginTop: 20,
    shadowColor: "#000", 
    shadowOffset: {
      width: 3,   
      height: 5,  
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,  
    elevation: 2,       
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  buttonText2: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  boldText: {
  },
  intakeText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
});

export default FitnessCalculators;