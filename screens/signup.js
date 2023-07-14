import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'
import { SvgXml } from 'react-native-svg';
import { UserContext } from "../UserContext";
import { useContext } from "react";

function SignUp() {
  const navigation = useNavigation();
  const {
    userEmail,
    setUserEmail,
    userName,
    setUserName,
  } = useContext(UserContext);

  const [Cpassword, setCPassword] = useState('');
  const [password, setPassword] = useState('');
  const [ValidPassword, setValidPassword] = useState(true);

  const handlePassword = (Cpassword, password) => {
    const amountIsValid = Cpassword === password;
    setValidPassword(amountIsValid);
    if (amountIsValid) {
      handleSignUp();
    }
  };

  const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
  const mailSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
  const lockSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

  const formIsInvalid = !ValidPassword;

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(userEmail, Cpassword)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', userEmail);
        console.log('Registered with name:', userName);
        setPassword('');
        setCPassword('');
        navigation.navigate('AboutYou');
      })
      .catch(error => alert(error.message))
  }

  const handleBack = () => {
    setPassword('');
    setCPassword('');
    setUserEmail('');
    setUserName('');
    navigation.navigate('Login');
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={userName}
            onChangeText={text => setUserName(text)}
          />
          <TouchableOpacity style={styles.iconContainer}>
            <SvgXml xml={userSvg} width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />
          <TouchableOpacity style={styles.iconContainer}>
            <SvgXml xml={mailSvg} width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              !ValidPassword && styles.invalidInput
            ]}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.iconContainer}>
            <SvgXml xml={lockSvg} width={20} height={20} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              !ValidPassword && styles.invalidInput
            ]}
            placeholder="Confirm Password"
            value={Cpassword}
            onChangeText={text => setCPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.iconContainer}>
            <SvgXml xml={lockSvg} width={20} height={20} />
          </TouchableOpacity>
        </View>
        
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Passwords do not match
          </Text>
        )}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.createAccountButton,
              formIsInvalid
            ]}
            onPress={() => handlePassword(Cpassword, password)}
            // disabled={formIsInvalid}
          >
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.createAccountButton} onPress={() => handleBack()}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
  },
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  iconContainer: {
    marginLeft: 10,
  },
  buttons: {
    width: '75%',
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
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default SignUp;
