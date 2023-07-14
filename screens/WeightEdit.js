import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

function WeightEdit() {
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
  } = useContext(UserContext);

  const [validWeightInput, setValidWeightInput] = useState(true);
  const handleWeight = (selectedWeight) => {
    const amountIsValid = !isNaN(selectedWeight) && selectedWeight > 0 && selectedWeight < 1000;
    setValidWeightInput(amountIsValid);
    if (amountIsValid) {
      setWeight(selectedWeight);
    }
  };

  const saveAndNavigate = () => {
    if (!validWeightInput) {
      Alert.alert('Input invalid', 'Please check your input values');
      return;
    }

    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const databaseRef = firebase.database().ref("users/" + uid);
    databaseRef
      .update({
        weight: weight,
      })
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

    console.log("weight: ", weight);
    navigation.navigate("FeaturesOverview");
  };

  const handleAccountPress = () => {
    console.log("Going back to AccountScreen");
    navigation.navigate("AccountScreen");
  };

  const formIsInvalid = !validWeightInput;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Editing</Text>
        </View>

        <View style={styles.center}>
          <Text style={[styles.question, !validWeightInput && styles.invalidLabel]}>What is your weight?</Text>
          <TextInput
            style={[
              styles.inputBox,
              !validWeightInput && styles.invalidInput,
            ]}
            onChangeText={handleWeight}
          />
        </View>

        {formIsInvalid && (
          <Text style={styles.errorText}>
            Please Enter A Valid Weight
          </Text>
        )}

        <TouchableOpacity
          style={[styles.save, !validWeightInput && { opacity: 0.5 }]}
          onPress={saveAndNavigate}
          disabled={!validWeightInput}
        >
          <View>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
  inputBox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  questions: {
    marginBottom: 10,
  },
  save: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    alignSelf: "center",
  },
  invalidLabel: {
    color: 'red'
  },
  invalidInput: {
    borderColor: "red",
    backgroundColor: "#ffb6c1",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default WeightEdit;

