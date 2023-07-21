import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from '../../../firebase'
import { UserContext } from "../../context/UserContext";
import { handleLogin } from "../../data/userServices";

function LoginScreen() {

  //remove loginERROr
  const navigation = useNavigation();
  const {
    userEmail,
    setUserEmail,
    setUserName,
    setGender,
    setAge,
    setHeight,
    setWeight,
    setGoal,
    setActivityLevel,
  } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null); 

  const handleSubmit = () => {
    handleLogin(userEmail, password, setUserEmail, setUserName, setGender, setAge, setHeight, setWeight, setGoal, setActivityLevel)
      .then(() => {
        setPassword('');
        setLoginError(null); 
        navigation.navigate('FeaturesOverview');
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Image source={require("../../assets/TaskBarIcons/logoblack.png")} style={styles.logo} />
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
        </View>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.createAccountButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.createAccountButton} onPress={() => {navigation.navigate('signup');}}>
            <Text style={styles.buttonText}>Create Account</Text>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  }
});

export default LoginScreen;