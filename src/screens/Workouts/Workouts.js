import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WorkoutsContext } from '../../context/WorkoutsContext';
import { auth } from "../../../firebase";
import { fetchWorkouts } from '../../data/userServices';

function renderWorkoutItem(itemData) {
  return <WorkoutItem {...itemData.item} />;
}

function WorkoutItem({ id, workoutName }) {
  const navigation = useNavigation();

  function workoutPressHandler() {
    navigation.navigate('ManageWorkout', {
      workoutId: id
    });
  }

  return (
    <Pressable
      onPress={workoutPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.workoutItem}>
        <View>
          <Text style={[styles.textBase, styles.exercise]}>
            {workoutName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const Workouts = () => {
  const navigation = useNavigation();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const workoutsCtx = useContext(WorkoutsContext);

  const handleAddWorkout = () => {
    navigation.navigate('ChoosePlan');
  };

  const user = auth.currentUser;

  useEffect(() => {
    async function getWorkouts() {
      setIsFetching(true);
      try {
        const workouts = await fetchWorkouts(user.uid);
        workoutsCtx.setWorkouts(workouts);
      } catch (error) {
        setError('Could not fetch workouts!');
      }
      setIsFetching(false);
    }
    getWorkouts();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Workouts',
      headerRight: () => (
        <TouchableOpacity
          onPress={handleAddWorkout}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Ionicons name="add" size={24} color="black" style={styles.addButton} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  let content = <Text style={styles.infoText}>No Workouts Added</Text>;

  if (workoutsCtx.workouts.length > 0) {
    content = (
      <FlatList
        data={workoutsCtx.workouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
      />
    );
  }

  if (error && !isFetching) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, styles.errorTitle]}>An error occurred!</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  infoText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  workoutItem: {
    padding: 15,
    marginVertical: 15,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    borderRadius: 15,
    elevation: 3,
    width: '97%',
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  textBase: {
    color: 'white',
    paddingHorizontal: 6,
    letterSpacing: 1.25,
  },
  exercise: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  addButton: {
    marginRight: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Workouts;
