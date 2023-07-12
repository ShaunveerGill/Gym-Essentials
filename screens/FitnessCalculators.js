import { Text, StyleSheet, View, Image } from "react-native";
// import UserContext from "../context/context";
// import { useContext } from "react";

// CALORIES:
// TDEE = BMR * ACTIVITY_LEVEL
// weight loss calories = TDEE - 750
// maintenance calories= TDEE
// weight gain calories = TDEE + 375

// PROTEIN:
// weight (muscle) gain = (weight/2.2) * (1.9g)
// weight (fat) loss = (weight/2.2) * (2.25g)
// maintenance = (weight/2.2) * (1.7g)

const LOSE_WEIGHT = -750;
const GAIN_WEIGHT = 375;

function FitnessCalculator() {
  const { Cgender } = useContext(UserContext); 
  const [caloricIntake, setCaloricIntake] = useState(0);
  const [proteinIntake, setProteinIntake] = useState(0);


  const calculate = () => {
    let BMR = gender === 'Male'
      ? 10 * (weight/2.2) + 6.25 * height - 5 * age + 5
      : 10 * (weight/2.2) + 6.25 * height - 5 * age - 161;

      let activityLevelInt  = parseInt(activityLevel, 10);
      let TDEE = BMR * activityLevelInt;

     if (goal == "Lose Weight") {
      let calories = TDEE + LOSE_WEIGHT;
      let protein = (weight/2.2) * 2.25;
     } else if (goal == "Gain Weight") {
      let calories = TDEE + GAIN_WEIGHT;
      let protein = (weight/2.2) * 1.9;
     } else if (goal == "Maintain Weight") {
      let calories = TDEE;
      let protein = (weight/2.2) * 1.7;
     } 
    }

    setCaloricIntake(calories.toFixed(2));
    setProteinIntake(protein.toFixed(2));
  };

function FitnessCalculators() {
  const { Cgender } = useContext(UserContext); 
  console.log(Cgender);  
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Fitness Calculators</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          Based on your fitness goals, your calculated
          <Text style={styles.boldText}> daily caloric intake </Text>
          is:
          {/* calorie intake value */}
          {"\n"}
        </Text>
        <Text style={styles.intakeText}>300 calories</Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          Based on your fitness goals, your calculated
          <Text style={styles.boldText}> daily protein intake </Text>
          is:
          {/* protein intake value */}
          {"\n"}
        </Text>
        <Text style={styles.intakeText}>300g</Text>
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
