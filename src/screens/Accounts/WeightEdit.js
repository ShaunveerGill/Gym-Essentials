import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import { updateData } from "../../data/userServices";

function WeightEdit() {
  const navigation = useNavigation();
  const UserCtx = useContext(UserContext);
  const [tempWeight, setTempWeight] = useState(UserCtx.weight || "");
  const amountIsValid =
    !isNaN(tempWeight) && tempWeight > 0 && tempWeight < 1000;

  const saveAndNavigate = () => {
    if (amountIsValid) {
      UserCtx.setWeight(tempWeight);
    }
    if (!amountIsValid) {
      Alert.alert("Input invalid", "Please check your input values");
      return;
    }
    updateData("weight", tempWeight);
    navigation.navigate("FeaturesOverview");
  };

  const formIsInvalid = !amountIsValid;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Editing</Text>
        </View>

        <View style={styles.center}>
          <Text
            style={[styles.question, !amountIsValid && styles.invalidLabel]}
          >
            What is your weight(lb)?
          </Text>
          <TextInput
            style={[styles.inputBox, !amountIsValid && styles.invalidInput]}
            onChangeText={setTempWeight}
            keyboardType="numeric"
            value={tempWeight.toString()}
          />
        </View>

        {formIsInvalid && (
          <Text style={styles.errorText}>Please Enter A Valid Weight</Text>
        )}

        <TouchableOpacity
          style={[styles.save, !amountIsValid && { opacity: 0.5 }]}
          onPress={saveAndNavigate}
          disabled={!amountIsValid}
        >
          <View>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.save}
          onPress={() => navigation.goBack()}
        >
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
    marginVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    alignSelf: "center",
  },
  invalidLabel: {
    color: "red",
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
