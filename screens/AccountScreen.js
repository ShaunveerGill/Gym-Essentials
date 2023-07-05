import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';

const AccountScreen = ({ navigation }) => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
        navigation.navigate('Login');
      })
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Screen</Text>
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  }
});

export default AccountScreen;