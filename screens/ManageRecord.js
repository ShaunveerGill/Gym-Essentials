import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RecordsContext } from '../RecordsContext';

function ManageRecord({ route }) {
  const recordsCtx = useContext(RecordsContext);
  const navigation = useNavigation();
  const editedRecordId = route.params?.recordId;
  const isEditing = !!editedRecordId;

  function deleteExpenseHandler() {
    recordsCtx.deleteRecord(editedRecordId);
    navigation.navigate('PersonalRecords');
  }

  function cancelHandler() {
    navigation.navigate('PersonalRecords');
  }

  function confirmHandler(recordData) {
    if (isEditing){
      recordsCtx.updateRecord(editedRecordId, recordData);
    } else {
      recordsCtx.addRecord(recordData);
    }
    navigation.navigate('PersonalRecords');
  }

  const [inputValues, setInputValues] = useState({
    exercise: '',
    record: '',
    date: '',
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    const recordData = {
      exercise: inputValues.exercise,
      record: inputValues.record,
      date: new Date(inputValues.date),
    };

    confirmHandler(recordData);
  }

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <Text style={styles.text}>Exercise</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Exercise"
              onChangeText={inputChangedHandler.bind(this, 'exercise')}
              value={inputValues.exercise}
            />
          </View>
  
          <Text style={styles.text}>Record</Text> 
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Record"
              onChangeText={inputChangedHandler.bind(this, 'record')}
              value={inputValues.record}
            />
          </View>
  
          <Text style={styles.text}>Date</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              onChangeText={inputChangedHandler.bind(this, 'date')}
              value={inputValues.date}
            />
          </View>
  
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={submitHandler}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.button} onPress={deleteExpenseHandler}>
              <Ionicons name="trash" color="white" size={20} />
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.button} onPress={cancelHandler}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
  
        </>
      ) : (
        <>
          <Text style={styles.text}>Exercise</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Exercise"
              onChangeText={inputChangedHandler.bind(this, 'exercise')}
              value={inputValues.exercise}
            />
          </View>
  
          <Text style={styles.text}>Record</Text> 
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Record"
              onChangeText={inputChangedHandler.bind(this, 'record')}
              value={inputValues.record}
            />
          </View>
  
          <Text style={styles.text}>Date</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              onChangeText={inputChangedHandler.bind(this, 'date')}
              value={inputValues.date}
            />
          </View>
  
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={submitHandler}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.button} onPress={cancelHandler}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
  
        </>
      )}
    </View>
  );
  
}

export default ManageRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20, // Add horizontal padding for space on the sides
  },
  text: {
    marginLeft: 40, // Adjust the left margin as per your preference
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    minWidth: 200,
    width: '80%',
  },
  buttonContainer: {
    alignItems: 'center', // Align buttons in the center horizontally
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginBottom: 10, // Add bottom margin for spacing between buttons
  },
  buttonText : {
    color: 'white',
    fontSize: 16,
  }
});
