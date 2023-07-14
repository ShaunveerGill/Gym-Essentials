import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WorkoutsContext } from '../WorkoutsContext';
import { auth } from "../firebase";
import axios from 'axios';
import { set } from 'firebase/database';



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

function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

function renderWorkoutItem(itemData) {
  return (
    <WorkoutItem {...itemData.item} />);  
}

function WorkoutItem({ id, exercise, record, date }) {
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
        <View>
          <Text style={[styles.textBase, styles.exercise]}>
            {exercise}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text> 
        </View>
        <View style={styles.recordContainer}>
          <Text style={styles.workout}>{record}</Text>
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
    navigation.navigate('ManageWorkout', {
      workoutId: 'w1'
    });
  };

  const user = auth.currentUser;
  const BACKEND_URL = 'https://gym-essentials-default-rtdb.firebaseio.com'

  useEffect(() => {
    async function getWorkouts() {
      setIsFetching(true);
      try {
        const workouts = await fetchWorkouts();
        workoutsCtx.setWorkouts(workouts);
      } catch (error) {
        setError('Could not fetch workouts!');
      }
      setIsFetching(false);
    }
    getWorkouts();
  }, []);

  async function fetchWorkouts() {
    const response = await axios.get(BACKEND_URL + '/users/' + user.uid + '/workouts/.json');
  
    const workouts = [];

    for (const key in response.data) {
      const workoutObj = {
        id: key,
        exercise: response.data[key].exercise,
        record: response.data[key].record,
        date: new Date(response.data[key].date)
      };
      workouts.push(workoutObj);
    }
  
    return workouts;
  }

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

  if(isFetching) {
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
    justifyContent: 'center', // Center content vertically
  },
  infoText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 'auto', // Pushes the text to the top edge of the centered container
    marginBottom: 'auto', // Pushes the text to the bottom edge of the centered container
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

  exercise: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  recordContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 20,
  },

  record: {
    color: 'black',
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

export default Workouts
