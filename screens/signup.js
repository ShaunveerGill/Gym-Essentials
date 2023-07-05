import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'

function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        navigation.navigate('AboutYou', { email: user.email });
      })
      .catch(error => alert(error.message))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>
        <TextInput 
          style={styles.input}
          placeholder="Full Name" 
        />
        <TextInput 
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={text => setEmail(text)} 
        />
        <TextInput 
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput 
          style={styles.input}
          placeholder="Confirm Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry 
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.createAccountButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.createAccountButton} onPress={() => {navigation.navigate('Login');}}>
            <Text style={styles.buttonText}>Back</Text>
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
  logo: {
    width: 100,
    height: 100,
  },
  buttons: {
    width: '100%',
  },
  createAccountButton: {
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
  }
});

export default SignUp;

