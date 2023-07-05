import React, { useState } from "react";
import { Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';

function AboutYou() {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');

  const handleFinishButtonPress = () => {
    // Push user data to Firebase Realtime Database
    const db = getDatabase();
    const userRef = ref(db, 'users');
    const user = {
      gender: gender,
      age: age,
      height: height,
      weight: weight,
      goal: goal
    };
    push(userRef, user);

    // Navigate to the next screen
    navigation.navigate('FeaturesOverview');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>About You</Text>
        </View>
        <View>
          <Text>What is your gender to calculate your calorie?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setGender('Male')}>
            <Text style={styles.buttonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setGender('Female')}>
            <Text style={styles.buttonText}>Female</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>What is your Age?</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setAge(text)} 
        />
        <View>
          <Text>What is your height?</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setHeight(text)} 
        />
        <View>
          <Text>What is your weight?</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setWeight(text)} 
        />
        <View>
          <Text>What is your goal?</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setGoal('Lose Weight')}>
            <Text style={styles.buttonText}>Lose Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setGoal('Gain Weight')}>
            <Text style={styles.buttonText}>Gain Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setGoal('Maintain Weight')}>
            <Text style={styles.buttonText}>Maintain Weight</Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinishButtonPress}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: '100%',
  },
  buttons: {
    width: '100%',
  },
  finishButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
});

export default AboutYou;
