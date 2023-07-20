import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

function HeightEdit() {
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

  const [validHeightInput, setValidHeightInput] = useState(true);
  const [tempHeight, setTempHEight] = useState('');
  const handleHeight = (selectedHeight) => {
    const amountIsValid = !isNaN(selectedHeight) && selectedHeight > 0 && selectedHeight < 274.32;
    setValidHeightInput(amountIsValid);
    if (amountIsValid) {
      setHeight(selectedHeight);
    }
  };

  const saveAndNavigate = () => {
    handleHeight(tempHeight);
    if (!validHeightInput) {
      Alert.alert('Input invalid', 'Please check your input values');
      return;
    }

    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const databaseRef = firebase.database().ref("users/" + uid);
    databaseRef
      .update({
        height: height,
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

  const formIsInvalid = !validHeightInput;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Editing</Text>
        </View>

        <View style={styles.center}>
          <Text style={[styles.question, !validHeightInput && styles.invalidLabel]}>What is your height(cm)?</Text>
          <TextInput
            style={[
              styles.inputBox,
              !validHeightInput && styles.invalidInput,
            ]}
            onChangeText={setTempHeight}
            keyboardType="numeric"
            value={height}
          />
        </View>

        {formIsInvalid && (
          <Text style={styles.errorText}>
            Please Enter A Valid Height
          </Text>
        )}

        <TouchableOpacity
          style={[styles.save, !validHeightInput && { opacity: 0.5 }]}
          onPress={saveAndNavigate}
          disabled={!validHeightInput}
        >
          <View>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.save} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
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

export default HeightEdit;

