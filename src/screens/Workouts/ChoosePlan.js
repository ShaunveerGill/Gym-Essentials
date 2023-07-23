import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChoosePlan = () => {
  const navigation = useNavigation();

  const handleOwnPlan = () => {
    navigation.navigate('ManageWorkout');
  };

  const handlePresetWorkout = () => {
    navigation.navigate('WorkoutList');
  };

  return (
    <View style={styles.container}>
        <View style={styles.container1}>
            <View style={styles.headerContainer1}>
              <TouchableOpacity
                style={styles.headerButton1}
                onPress={() => navigation.goBack()}
              >
                <Ionicons
                  name="arrow-back"
                  size={28}
                  style={styles.goBackIcon}
                />
              </TouchableOpacity>

            </View>
            <Text style={styles.title}>Choose an Option:{'\n'}</Text>

            <TouchableOpacity style={styles.button} onPress={handleOwnPlan}>
            <MaterialCommunityIcons name="clipboard-list-outline" size={40} color="white" />
                <Text style={styles.buttonText}>Create my own Workout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handlePresetWorkout}>
                <MaterialCommunityIcons name="weight-lifter" size={40} color="white" />
                <Text style={styles.buttonText}>Pre-set Workout</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container1: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 60,
  },
  headerContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerButton: {
    padding: 5,
  },
  goBackIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ChoosePlan;