import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { UserContext } from "../../context/UserContext";

const LOSE_WEIGHT = -750;
const GAIN_WEIGHT = 375;

// MEN 88.362 + (13.397 * (weightInt / 2.2)) + (4.799 * heightInt) – (5.677 * ageInt)
// WOMEN 447.593 + (9.247 * (weightInt / 2.2)) + (3.098 * heightInt) – (4.330 * ageInt)
const FitnessCalculators = () => {
  //change this back
  const {gender, age, height, weight, goal, activityLevel} = useContext(UserContext);

  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");

  const [caloriesDisplay, setCaloriesDisplay] = useState(0);
  const [proteinDisplay, setProteinDisplay] = useState(0);
  const [bmiDisplay, setbmiDisplay] = useState(0);

  useEffect(() => {
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
    let calculatedCalories = 0;
    let calculatedProtein = 0;

    if (goal === "Lose Weight") {
      calculatedCalories = TDEE + LOSE_WEIGHT;
      calculatedProtein = Math.ceil((weightInt / 2.2) * 2.25);
    } else if (goal === "Gain Weight") {
      calculatedCalories = TDEE + GAIN_WEIGHT;
      calculatedProtein = Math.ceil((weightInt / 2.2) * 1.9);
    } else if (goal === "Maintain Weight") {
      calculatedCalories = TDEE;
      calculatedProtein = Math.ceil((weightInt / 2.2) * 1.7);
    }
    setCalories(calculatedCalories);
    setProtein(calculatedProtein);

    // Calculate BMI
    let weightKg = weightInt / 2.2;
    let heightM = heightInt / 100;
    let calculatedBmi = weightKg / (heightM * heightM);
    setBmi(calculatedBmi);

    // Determine BMI Category
    let category = '';
    if (calculatedBmi < 18.5) {
      category = 'Underweight';
    } else if (calculatedBmi < 24.9) {
      category = 'Normal weight';
    } else if (calculatedBmi < 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }
    setBmiCategory(category);

    // Update display values
    let interval = null;
    interval = setInterval(() => {
      setCaloriesDisplay((caloriesDisplay) => caloriesDisplay + 10 < calculatedCalories ? caloriesDisplay + 50 : calculatedCalories);
      setProteinDisplay((proteinDisplay) => proteinDisplay + 1 < calculatedProtein ? proteinDisplay + 6 : calculatedProtein);
      setbmiDisplay((bmiDisplay) => bmiDisplay + 1 < calculatedBmi ? bmiDisplay + 2 : calculatedBmi);
    }, 5);

    return () => clearInterval(interval);
  }, [gender, age, height, weight, goal, activityLevel]);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      {/* <Image source={require('../assets/logoblack.png')} style={styles.logo} /> */}
      <View style={styles.button}>
      <Text style={styles.buttonText2}>{'\n'}Body Mass Index {"\n"}</Text>
        <Text style={styles.intakeText}>{bmiDisplay.toFixed(1)} {'\n'}</Text>
        <Text style={styles.buttonText}>BMI Category:</Text>
        <Text style={styles.intakeText2}>{bmiCategory} {'\n'} </Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText2}>
          {'\n'}
          Daily Caloric Intake
          {'\n'}
        </Text>
        <Text style={styles.intakeText}>{caloriesDisplay} cals
        {'\n'}
        </Text>
        <Text style={styles.buttonText}>
          Based on your fitness goals
          {/* <Text style={styles.boldText}> Daily Caloric Intake </Text>
          is: */}
          {'\n'}
        </Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText2}>
          {'\n'}
          Daily Protein Intake
          {'\n'}
        </Text>
        <Text style={styles.intakeText}>{proteinDisplay} g
        {'\n'}
        </Text>
        <Text style={styles.buttonText}>
          Based on your fitness goals
          {/* <Text style={styles.boldText}> Daily Protein Intake </Text>
          is: */}
          {'\n'}
        </Text>
      </View>
    </ScrollView>
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
    width: "80%",
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
    color: "grey",
    fontSize: 16,
  },
  buttonText2: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  boldText: {
  },
  intakeText: {
    fontFamily: 'Verdana',
    alignItems: "center",
    justifyContent: "center",
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  intakeText2: {
    color: "grey",
    fontFamily: 'Verdana',
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    fontStyle: 'italic',
  },

});

export default FitnessCalculators;
