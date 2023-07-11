import { Text, StyleSheet, View, Image } from "react-native";
// import UserContext from "../context/context";
// import { useContext } from "react";

const SEDENTARY = 1.2;
const LIGHTLY_ACTIVE = 1.375;
const MODERATELY_ACTIVE = 1.55;
const VERY_ACTIVE = 1.725;
const EXTRA_ACTIVE = 1.9;

// TDEE = BMR * ACTIVITY_LEVEL

// const calculate = () => {


// };
// function FitnessCalculator() {
//   const userData = useContext(DataContext);
//   const { weight, height, age, gender, activityLevel } = userData;
//   const [caloricIntake, setCaloricIntake] = useState(0);
//   const [proteinIntake, setProteinIntake] = useState(0);

  // const calculate = () => {
  //   let BMR = gender === 'Male'
  //     ? 10 * weight + 6.25 * height - 5 * age + 5
  //     : 10 * weight + 6.25 * height - 5 * age - 161;

  //   // assuming activityLevel as sedentary for now.
  //   let activityLevel = 1.2;

  //   // adjust BMR based on activity level
  //   let calories = BMR * activityLevel;

  //   // calculate protein intake based on weight
  //   let protein = weight * 0.8; // 0.8g per kg of body weight is a general recommendation

  //   setCaloricIntake(calories.toFixed(2));
  //   setProteinIntake(protein.toFixed(2));
  //};

function FitnessCalculators() {
  // const { item } = useContext(UserContext);
  // console.log(item);
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
