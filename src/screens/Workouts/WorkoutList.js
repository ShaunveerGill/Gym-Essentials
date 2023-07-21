import React, { useContext, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";
import axios from "axios";
import { WorkoutsContext } from "../../context/WorkoutsContext";
  
const WorkoutsData = [
  {
    workoutName: "Quads & Calves",
    exercises: [
      {
        exerciseName: "Squats",
        sets: "5",
        reps: "5",
      },
      {
        exerciseName: "Seated Calf Raise",
        sets: "3",
        reps: "12",
      },
      {
        exerciseName: "Leg Press",
        sets: "4",
        reps: "6",
      },
      {
        exerciseName: "Calf Press on Leg Press",
        sets: "4",
        reps: "8",
      },
    ]
  },
  {
    workoutName: "Glutes and Hamstrings",
    exercises: [
      {
        exerciseName: "Hip Thrust",
        sets: "5",
        reps: "5",
      },
      {
        exerciseName: "Romanian Deadlift",
        sets: "5",
        reps: "5",
      },
      {
        exerciseName: "Lying Hamstring Curl",
        sets: "4",
        reps: "8",
      },
      
      {
        exerciseName: "Hip Abductor Machine",
        sets: "3",
        reps: "12",
      },
    ]
  },
  {
    workoutName: "Pull (Back & Biceps)",
    exercises: [
      {
        exerciseName: "Bent Over Barbell Row",
        sets: "5",
        reps: "5",
      },
      {
        exerciseName: "Seated Cable Row",
        sets: "4",
        reps: "6",
      },
      {
        exerciseName: "Cable Bicep Curl",
        sets: "4",
        reps: "8",
      },
      {
        exerciseName: "Bent Over One Arm Dumbbell Row",
        sets: "4",
        reps: "8",
      },
      {
        exerciseName: "Hammer Curl",
        sets: "4",
        reps: "8",
      },
    ]
  },
  {
    workoutName: "Push (Chest, Shoulders, & Triceps)",
    exercises: [
      {
        exerciseName: "Push Ups",
        sets: "5",
        reps: "5",
      },
      {
        exerciseName: "Cable Tricep Pushdown",
        sets: "4",
        reps: "8",
      },
      {
        exerciseName: "Lateral Raise",
        sets: "4",
        reps: "6",
      },
      {
        exerciseName: "Dumbbell Chest Fly",
        sets: "4",
        reps: "8",
      },
      {
        exerciseName: "Overhead Press",
        sets: "4",
        reps: "8",
      },
    ]
  },
];

const WorkoutList = () => {
    const navigation = useNavigation();
    const user = auth.currentUser;
    const BACKEND_URL = 'https://gym-essentials-default-rtdb.firebaseio.com'
    const workoutsCtx = useContext(WorkoutsContext);
    
    async function handlePress (workoutName) {
      const selectedExercises = (WorkoutsData.find((workout) => workout.workoutName === workoutName)).exercises;

      const tempObj = {
        workoutName: workoutName,
        exercises: []
      };
      
      const response = await axios.post(BACKEND_URL + "/users/" + user.uid + "/workouts.json", tempObj);
      const workoutId = response.data.name;

      for(let i = 0; i < selectedExercises.length; i++){
          const responeTwo = await axios.post(BACKEND_URL + "/users/" + user.uid + "/workouts/" + workoutId + "/exercises.json", selectedExercises[i]);
          const exerciseId = responeTwo.data.name;
          selectedExercises[i].id = exerciseId;
          tempObj.exercises.push(selectedExercises[i]);
      }
   
      tempObj.id = workoutId;
      workoutsCtx.addWorkout(tempObj);
      navigation.navigate('Workouts')
    }
 
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {handlePress(item.workoutName)}}
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
                <Ionicons
                  name="arrow-back"
                  size={28}
                  style={styles.goBackIcon}
                />
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
      justifyContent: 'center',
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
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 40,
    },
    headerButton: {
      padding: 5,
    },
    goBackIcon: {
      marginRight: 10,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 3,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });


export default WorkoutList;
