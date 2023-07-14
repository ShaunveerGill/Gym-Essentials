import React, { isValidElement, useContext, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RecordsContext } from '../RecordsContext';

function ManageRecord({ route }) {
  const recordsCtx = useContext(RecordsContext);
  const navigation = useNavigation();
  const editedRecordId = route.params?.recordId;
  const isEditing = !!editedRecordId;

  const selectedRecord = recordsCtx.records.find(
    (record) => record.id === editedRecordId
  );
  
  const [inputs, setInputs] = useState({
    exercise: {
      value: selectedRecord ? selectedRecord.exercise : '',
      isValid: true,
    },
    record: {
      value: selectedRecord ? selectedRecord.record : '',
      isValid: true,
    },
    date: {
      value: selectedRecord ? selectedRecord.date.toISOString().slice(0, 10): '',
      isValid: true,
    }
  });

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

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const recordData = {
      exercise: inputs.exercise.value,
      record: inputs.record.value,
      date: new Date(inputs.date.value),
    };

    const exerciseIsValid = recordData.exercise.trim().length > 0;
    const recordIsValid = recordData.record.trim().length > 0;
    const dateIsValid = recordData.date.toString() !== 'Invalid Date';

    if (!exerciseIsValid || !recordIsValid || !dateIsValid) {
      setInputs((curInputs) => {
        return {
          exercise: { value: curInputs.exercise.value, isValid: exerciseIsValid },
          record: { value: curInputs.record.value, isValid: recordIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid }
        };
      });
      return;
    }

    confirmHandler(recordData);
  }

  const formIsInvalid =
    !inputs.exercise.isValid ||
    !inputs.record.isValid ||
    !inputs.date.isValid;

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <Text style={[styles.text, !inputs.exercise.isValid && styles.invalidLabel]}>Exercise</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.exercise.isValid && styles.invalidInput]}
              placeholder="Exercise"
              onChangeText={inputChangedHandler.bind(this, 'exercise')}
              value={inputs.exercise.value}
            />
          </View>
  
          <Text style={[styles.text, !inputs.record.isValid && styles.invalidLabel]}>Record</Text> 
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.record.isValid && styles.invalidInput]}
              placeholder="Record"
              onChangeText={inputChangedHandler.bind(this, 'record')}
              value={inputs.record.value}
            />
          </View>
  
          <Text style={[styles.text, !inputs.date.isValid && styles.invalidLabel]}>Date</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.date.isValid && styles.invalidInput]}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              onChangeText={inputChangedHandler.bind(this, 'date')}
              value={inputs.date.value}
            />
          </View>

          {formIsInvalid && (
            <Text style={styles.errorText}>
              Invalid input values - please check your entered data!
            </Text>
          )}
  
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
          <Text style={[styles.text, !inputs.exercise.isValid && styles.invalidLabel]}>Exercise</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.exercise.isValid && styles.invalidInput]}
              placeholder="Exercise"
              onChangeText={inputChangedHandler.bind(this, 'exercise')}
              value={inputs.exercise.value}
            />
          </View>
  
          <Text style={[styles.text, !inputs.record.isValid && styles.invalidLabel]}>Record</Text> 
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.record.isValid && styles.invalidInput]}
              placeholder="Record"
              onChangeText={inputChangedHandler.bind(this, 'record')}
              value={inputs.record.value}
            />
          </View>
  
          <Text style={[styles.text, !inputs.date.isValid && styles.invalidLabel]}>Date</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.date.isValid && styles.invalidInput]}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              onChangeText={inputChangedHandler.bind(this, 'date')}
              value={inputs.date.value}
            />
          </View>

          {formIsInvalid && (
            <Text style={styles.errorText}>
              Invalid input values - please check your entered data!
            </Text>
          )}

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
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    margin: 8,
  },
  invalidLabel: {
    color: 'red'
  },
  invalidInput: {
    backgroundColor: '#ffb6c1'
  },
});
