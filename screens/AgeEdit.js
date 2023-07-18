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

function AgeEdit() {
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

  const [validAgeInput, setValidAgeInput] = useState(true);
  const handleAge = (selectedAge) => {
    const amountIsValid = !isNaN(selectedAge) && selectedAge > 0 && selectedAge < 130;
    setValidAgeInput(amountIsValid);
    if (amountIsValid) {
      setAge(selectedAge);
    }
  };

  const saveAndNavigate = () => {
    if (!validAgeInput) {
      Alert.alert('Input invalid', 'Please check your input values');
      return;
    }

    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const databaseRef = firebase.database().ref("users/" + uid);
    databaseRef
      .update({
        age: age,
      })
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

    navigation.navigate("FeaturesOverview");
  };

  const handleAccountPress = () => {
    navigation.navigate("AccountScreen");
  };

  const formIsInvalid = !validAgeInput;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Editing</Text>
        </View>

        <View style={styles.center}>
          <Text style={[styles.question, !validAgeInput && styles.invalidLabel]}>What is your age?</Text>
          <TextInput
            style={[
              styles.inputBox,
              !validAgeInput && styles.invalidInput,
            ]}
            onChangeText={handleAge}
            keyboardType="numeric"
          />
        </View>

        {formIsInvalid && (
          <Text style={styles.errorText}>
            Please Enter A Valid Age
          </Text>
        )}

        <TouchableOpacity
          style={[styles.save, !validAgeInput && { opacity: 0.5 }]}
          onPress={saveAndNavigate}
          disabled={!validAgeInput}
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

export default AgeEdit;

