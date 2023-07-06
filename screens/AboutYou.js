import React, { useState } from "react";
import { Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';

function AboutYou() {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');

  const handleGender = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleGoal= (selectedGoal) => {
    setGoal(selectedGoal);
  }
  const route = useRoute();
  const { email } = route.params;

  const handleFinishButtonPress = () => {
    // Push user data to Firebase Realtime Database
    const db = getDatabase();
    const userRef = ref(db, 'users');
    const user = {
      email: route.params.email,
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
          <Text style={styles.questions}>What is your gender to calculate your calorie?</Text>
        </View>
         {/*Changed code for when you want change the gender selections*/}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: gender === 'Male' ? '#ffffff' : '#cccccc' }]}
            onPress={() => handleGender('Male')}
          >
            <Text style={styles.buttonText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: gender === 'Female' ? '#ffffff' : '#cccccc' }]}
            onPress={() => handleGender('Female')}
          >
            <Text style={styles.buttonText}>Female</Text>
          </TouchableOpacity>

        </View>

        <View>
          <Text style={styles.questions}>What is your age?</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setAge(text)} 
        />
        <View>
          <Text style={styles.questions}>What is your height?</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setHeight(text)} 
        />
        <View>
          <Text style={styles.questions}>What is your weight?</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setWeight(text)} 
        />
        <View>
          <Text style={styles.questions}>What is your goal?</Text>
        </View>

        <TouchableOpacity
            style={[styles.buttonGoals, { backgroundColor: goal === 'Lose Weight' ? '#ffffff' : '#cccccc' }]}
            onPress={() => handleGoal('Lose Weight')}
          >
            <Text style={styles.buttonText}>Lose Weight</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.buttonGoals, { backgroundColor: goal === 'Gain Weight' ? '#ffffff' : '#cccccc' }]}
            onPress={() => handleGoal('Gain Weight')}
          >
            <Text style={styles.buttonText}>Gain Weight</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.buttonGoals, { backgroundColor: goal === 'Maintain Weight' ? '#ffffff' : '#cccccc' }]}
            onPress={() => handleGoal('Maintain Weight')}
          >
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
    alignItems: "left",
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
    marginTop: 20,
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
  buttonGoals: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    marginTop: 5,
  },
  questions: {
    marginBottom: 10,
  },
});

export default AboutYou;
