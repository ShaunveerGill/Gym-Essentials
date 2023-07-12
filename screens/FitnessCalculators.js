import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from "react-native";
import { UserContext, UserContextProvider } from "../UserContext";
import { useContext, useState, useEffect } from "react";


const LOSE_WEIGHT = -750;
const GAIN_WEIGHT = 375;

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

  const calculate = () => {
    let weightInt  = parseInt(weight, 10);
    let heightInt  = parseInt(height, 10);
    let ageInt = parseInt(age, 10);
    console.log(weightInt);
    console.log(heightInt);
    console.log(ageInt);
    let BMR = gender === 'Male'
      ? 10 * (weightInt/2.2) + 6.25 * heightInt - 5 * ageInt + 5
      : 10 * (weightInt/2.2) + 6.25 * heightInt - 5 * ageInt - 161;

      console.log(BMR);

      let activityLevelInt  = 1.2; 
      console.log(activityLevelInt);

      console.log(activityLevelInt);
      let TDEE = Math.ceil(BMR * activityLevelInt);
      console.log(TDEE);

     if (goal == "Lose Weight") {
      setCalories(TDEE + LOSE_WEIGHT);
      setProtein(Math.ceil((weightInt/2.2) * 2.25));

     } else if (goal == "Gain Weight") {
      setCalories(TDEE + GAIN_WEIGHT);
      setProtein(Math.ceil((weightInt/2.2) * 1.9));
     } else if (goal == "Maintain Weight") {
      setCalories(TDEE);
      setProtein(Math.ceil((weightInt/2.2) * 1.7));
     } 

      //setCalories(calories.toFixed(2));
      //setProtein(protein.toFixed(2));
    }

    useEffect(() => {
      calculate();
    }, []);
    
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Fitness Calculators</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          Based on your fitness goals, your calculated
          <Text style={styles.boldText}> daily caloric intake </Text>
          is:
          {"\n"}
        </Text>
        <Text style={styles.intakeText}>{calories} calories</Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          Based on your fitness goals, your calculated
          <Text style={styles.boldText}> daily protein intake </Text>
          is:
          {"\n"}
        </Text>
        <Text style={styles.intakeText}>{protein}g</Text>
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
  boldText: {
    fontWeight: "bold",
  },
  intakeText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
});

export default FitnessCalculators;

