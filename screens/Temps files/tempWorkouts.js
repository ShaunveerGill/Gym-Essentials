import React, { useState } from 'react';
import { View, StyleSheet, Pressable, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DUMMY_WORKOUTS = [
  {
    id: 'w1',
    workoutName: 'Workout 1',
  },
  {
    id: 'w2',
    workoutName: 'Workout 2',
  },
];

function WorkoutItem({ id, workoutName, onWorkoutNameChange }) {
  const navigation = useNavigation();
  
  function workoutPressHandler() {
    navigation.navigate('ManageWorkout', {
      workoutId: id
    });
  }

  return (
    <Pressable 
      onPress={workoutPressHandler} 
      style={({pressed}) => pressed && styles.pressed}
    >
      <View style={styles.workoutItem}>
        <TextInput 
          value={workoutName} 
          onChangeText={newName => onWorkoutNameChange(id, newName)}
          style={[styles.textBase, styles.workoutName]}
        />
      </View>
    </Pressable>
  );
}

function renderWorkoutItem({ item, index }, changeWorkoutName) {
  return (
    <WorkoutItem 
      {...item} 
      onWorkoutNameChange={changeWorkoutName}
    />
  );
}

function Workouts() {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState(DUMMY_WORKOUTS);

  const handleAddWorkout = () => {
    const newId = 'w' + (workouts.length + 1);
    const newWorkout = {id: newId, workoutName: 'Workout ' + (workouts.length + 1)};
    setWorkouts(currentWorkouts => [...currentWorkouts, newWorkout]);
  };

  const changeWorkoutName = (id, newName) => {
    setWorkouts(currentWorkouts => {
      const workoutIndex = currentWorkouts.findIndex(workout => workout.id === id);
      const newWorkouts = [...currentWorkouts];
      newWorkouts[workoutIndex] = {...newWorkouts[workoutIndex], workoutName: newName};
      return newWorkouts;
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Workouts',
      headerRight: () => (
        <TouchableOpacity 
          onPress={handleAddWorkout} 
          style={({pressed}) => pressed && styles.pressed}
        >
          <Ionicons name="add" size={24} color="black" style={styles.addButton} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, workouts]);

  return (
    <View style={styles.container}>
        <FlatList
          data={workouts}
          renderItem={itemData => renderWorkoutItem(itemData, changeWorkoutName)}
          keyExtractor={(item) => item.id}
        />
    </View>
  );
}

export default Workouts;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },

  workoutItem: {
    padding: 12,
    marginVertical: 8,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
  },
  
  textBase: {
    color: 'white',
  },

  workoutName: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },

  addButton: {
    marginRight: 20,
  },
});
