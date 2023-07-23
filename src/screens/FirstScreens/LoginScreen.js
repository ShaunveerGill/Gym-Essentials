import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/UserContext";
import { handleLogin } from "../../data/userServices";
import { Ionicons } from '@expo/vector-icons';


function LoginScreen() {

  const navigation = useNavigation();
  const UserCtx = useContext(UserContext);
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await handleLogin(UserCtx.userEmail, password, UserCtx);
      setPassword('');
      navigation.navigate('FeaturesOverview');
    } catch (error) {
      Alert.alert("Invalid Credentials", "The email or password you have entered is invalid");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Image source={require("../../assets/TaskBarIcons/logoblack.png")} style={styles.logo} />
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={UserCtx.userEmail}
              onChangeText={text => UserCtx.setUserEmail(text)}
            />
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="mail-outline" size={24} color="black" style={styles.addButton} />
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
           <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.addButton} />
            </TouchableOpacity>
         </View>
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
  inputContainer: {
    width: '100%',
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