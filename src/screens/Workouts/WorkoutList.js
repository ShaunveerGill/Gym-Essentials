import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { WorkoutListsHandler } from "../../data/userServices";
import { WorkoutsData } from "../../data/WorkoutData";

const WorkoutList = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const workoutsCtx = useContext(WorkoutsContext);

  const handlePress = async (workoutName) => {
    try {
      const selectedWorkoutData = WorkoutsData.find(
        (workout) => workout.workoutName === workoutName
      );
      await WorkoutListsHandler(workoutName, user.uid, workoutsCtx, WorkoutsData, selectedWorkoutData);
      navigation.navigate("Workouts");
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        handlePress(item.workoutName);
      }}
    >
      <Text style={styles.buttonText}>{item.workoutName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.headerContainer1}>
          <TouchableOpacity
            style={styles.headerButton1}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} style={styles.goBackIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Pre-Set Workouts:</Text>
        <View style={styles.container}>
          <FlatList
            data={WorkoutsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.workoutName}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container1: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 60,
  },
  headerContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerButton1: {
    padding: 5,
  },
  goBackIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default WorkoutList;