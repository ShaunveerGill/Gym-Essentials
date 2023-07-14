import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import TimerModal from './TimerModal';

function EditWorkout({ navigation, route }) {
  const { workoutId } = route.params;
  
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);
  const dropAnim = useRef(new Animated.Value(-100)).current;

  const dropDown = () => {
    // Will change dropAnim value to 0
    Animated.timing(dropAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const addExerciseHandler = () => {
    dropDown();
    setExercises((currentExercises) => [
      ...currentExercises,
      { id: Math.random().toString(), sets: '', reps: '', done: false },
    ]);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    setTimerReset(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const resetTimer = () => {
    setTimerReset(true);
  };

  const toggleCheckbox = () => {
    setCheckboxChecked(!checkboxChecked);
    if (!checkboxChecked) {
      setModalVisible(true);
      setTimerReset(false);
    }
  };

  const renderExerciseItem = ({ item }) => (
    <Animated.View style={{ ...styles.itemContainer, transform: [{ translateY: dropAnim }] }}>
      <Text style={styles.text}>Sets: </Text>
      <TextInput 
        style={styles.smallInput} 
        value={item.sets}
        onChangeText={(text) => {
          const newExercises = [...exercises];
          const index = exercises.findIndex(exercise => exercise.id === item.id);
          newExercises[index].sets = text;
          setExercises(newExercises);
        }}
      />

      <Text style={styles.text}> Reps: </Text>
      <TextInput 
        style={styles.smallInput} 
        value={item.reps}
        onChangeText={(text) => {
          const newExercises = [...exercises];
          const index = exercises.findIndex(exercise => exercise.id === item.id);
          newExercises[index].reps = text;
          setExercises(newExercises);
        }}
      />

      <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
        {checkboxChecked ? (
          <Text style={styles.checkboxText}>✓</Text>
        ) : (
          <Text style={styles.checkboxText}>☐</Text>
        )}
      </TouchableOpacity>
      <TimerModal
        isVisible={modalVisible}
        onClose={closeModal}
        duration={60}
        onReset={resetTimer}
      />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Text style={styles.headerButtonText}>X</Text>
        </TouchableOpacity>
        <View style={styles.headerSpace} />
        <TouchableOpacity style={styles.headerButton} onPress={() => alert('Save button pressed')}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <TextInput 
        style={styles.input} 
        placeholder="Workout Name" 
        value={workoutName}
        onChangeText={(text) => setWorkoutName(text)}
      />

      <FlatList 
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={addExerciseHandler}
      >
        <Text style={styles.buttonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,  // Increased padding at the top
      paddingHorizontal: 20,
      paddingBottom: 60,  // Increased padding at the bottom
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    headerButton: {
      padding: 10,
    },
    headerButtonText: {
      fontSize: 18,
    },
    headerSpace: {
      flex: 1,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 30,  // Increased margin at the bottom
      padding: 10,
      width: '100%',
    },
    smallInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      padding: 10,
      width: '20%',
      alignSelf: 'center',  
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,  
      justifyContent: 'space-between',  // Distribute space evenly between the components
    },
    text: {
      marginRight: 5,
      alignSelf: 'center',  
    },
    button: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 30, 
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
    },
    checkbox: {
      borderWidth: 1,
      borderColor: "black",
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 20, 
    },
    checkboxText: {
      fontSize: 18,
    },
  });


export default EditWorkout;
