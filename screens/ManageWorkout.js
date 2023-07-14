import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function ManageWorkout({ route }) {
  const navigation = useNavigation();
  const editedWorkoutId = route.params?.workoutId;
  const isEditing = !!editedWorkoutId;

  function startWorkoutHandler() {
    // logic for starting workout
  }

  function editWorkoutHandler() {
    navigation.navigate('EditWorkout', {
      workoutId: editedWorkoutId,
    });
  }

  function deleteWorkoutHandler() {
    navigation.navigate('FeaturesOverview')
  }

  function cancelHandler() {
    navigation.navigate('FeaturesOverview')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={startWorkoutHandler}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={editWorkoutHandler}>
        <Text style={styles.buttonText}>Edit Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={deleteWorkoutHandler}>
        <Ionicons name="trash" color="white" size={36} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={cancelHandler}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    marginBottom: 10
  },

  buttonText: {
    color: "white",
    fontSize: 16
  },
});

export default ManageWorkout;

