import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { handleSignUp } from "../../data/userServices";
import { Ionicons } from '@expo/vector-icons';

function SignUp() {
  const navigation = useNavigation();
  const UserCtx = useContext(UserContext);

  const [Cpassword, setCPassword] = useState('');
  const [password, setPassword] = useState('');
  const [ValidPassword, setValidPassword] = useState(true);

  const handlePassword = (Cpassword, password) => {

    const amountIsValid = Cpassword === password;
    setValidPassword(amountIsValid);
    if (amountIsValid) {
      handleSubmit();
    }
  };

  const formIsInvalid = !ValidPassword;
  
  const handleSubmit = async () => {
    try {
      const email = UserCtx.userEmail;
      await handleSignUp(email, Cpassword);
      setPassword('');
      navigation.navigate('AboutYou');
    } catch (error) {
      if (error.code === "auth/weak-password") {
        Alert.alert("Signup Error", "The password must be at least 6 characters");
      } else {
        Alert.alert("Signup Error", "Please verify the information you have entered.");
      }
  
    }
  };

  

  const handleBack = () => {
    setPassword('');
    setCPassword('');
    UserCtx.setUserEmail('');
    UserCtx.setUserName('');
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
            value={UserCtx.userName}
            onChangeText={text => UserCtx.setUserName(text)}
          />
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="mail-outline" size={24} color="black" style={styles.addButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={UserCtx.userEmail}
            onChangeText={text => UserCtx.setUserEmail(text)}
          />
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="person-outline" size={24} color="black" style={styles.addButton} />
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
          <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.addButton} />
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
            <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.addButton} />
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
