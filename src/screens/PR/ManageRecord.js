import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RecordsContext } from '../../context/RecordsContext';
import { auth } from "../../../firebase";
import { deleteRecordsHandler,confirmRecordsHandler } from '../../data/userServices';
import { ChangedHandler } from '../../controller/UserController';

function ManageRecord({ route }) {
  const recordsCtx = useContext(RecordsContext);
  const navigation = useNavigation();
  const editedRecordId = route.params?.recordId;
  const isEditing = !!editedRecordId;
  const user = auth.currentUser;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

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

  function cancelHandler() {
    navigation.navigate('PersonalRecords');
  }

  function deleteRecord() {
    deleteRecordsHandler(
      user.uid,
      editedRecordId,
      setError,
      setIsSubmitting,
      recordsCtx
    );
    navigation.navigate('PersonalRecords');
  }

  // function inputChangedHandler(inputIdentifier, enteredValue) {
  //   setInputs((curInputs) => {
  //     return {
  //       ...curInputs,
  //       [inputIdentifier]: { value: enteredValue, isValid: true },
  //     };
  //   });
  // }

  async function submitHandler() {
    const recordData = {
      exercise: inputs.exercise.value,
      record: inputs.record.value,
      date: new Date(inputs.date.value),
    };
  
    const exerciseIsValid = recordData.exercise.trim().length > 0;
    const recordIsValid = recordData.record.trim().length > 0;
    const dateIsValid = recordData.date.toString() !== "Invalid Date";
  
    if (!exerciseIsValid || !recordIsValid || !dateIsValid) {
      setInputs((curInputs) => {
        return {
          exercise: { value: curInputs.exercise.value, isValid: exerciseIsValid },
          record: { value: curInputs.record.value, isValid: recordIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
        };
      });
      return;
    }
  
    try {
      await confirmRecordsHandler(
        recordData,
        user.uid,
        editedRecordId,
        setIsSubmitting,
        setError,
        recordsCtx,
        isEditing,
      );
      navigation.navigate("PersonalRecords");
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }
  

  const formIsInvalid =
    !inputs.exercise.isValid ||
    !inputs.record.isValid ||
    !inputs.date.isValid;

  if (error && !isSubmitting) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, styles.errorTitle]}>An error occurred!</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (isSubmitting) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>      
    );
  }

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <Text style={[styles.text, !inputs.exercise.isValid && styles.invalidLabel]}>Exercise</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.exercise.isValid && styles.invalidInput]}
              placeholder="Exercise"
              onChangeText={(enteredValue) =>
                ChangedHandler('exercise', enteredValue, setInputs)
              }

              value={inputs.exercise.value}
            />
          </View>
  
          <Text style={[styles.text, !inputs.record.isValid && styles.invalidLabel]}>Record</Text> 
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.record.isValid && styles.invalidInput]}
              placeholder="Record"
              // onChangeText={inputChangedHandler.bind(this, 'record')}
              onChangeText={(enteredValue) =>
                ChangedHandler("record", enteredValue, setInputs)
              }
              value={inputs.record.value}
            />
          </View>
  
          <Text style={[styles.text, !inputs.date.isValid && styles.invalidLabel]}>Date</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.date.isValid && styles.invalidInput]}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              onChangeText={(enteredValue) =>
                ChangedHandler("date", enteredValue, setInputs)
              }
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
  
            <TouchableOpacity
              style={styles.button}
              onPress={deleteRecord}
            >
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
              // onChangeText={inputChangedHandler.bind(this, 'exercise')}
              onChangeText={(enteredValue) =>
                ChangedHandler("exercise", enteredValue, setInputs)
              }
              value={inputs.exercise.value}
            />
          </View>
  
          <Text style={[styles.text, !inputs.record.isValid && styles.invalidLabel]}>Record</Text> 
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.record.isValid && styles.invalidInput]}
              placeholder="Record"
              // onChangeText={inputChangedHandler.bind(this, 'record')}
              onChangeText={(enteredValue) =>
                ChangedHandler("record", enteredValue, setInputs)
              }
              value={inputs.record.value}
            />
          </View>
  
          <Text style={[styles.text, !inputs.date.isValid && styles.invalidLabel]}>Date</Text>
  
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, !inputs.date.isValid && styles.invalidInput]}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              onChangeText={(enteredValue) =>
                ChangedHandler("date", enteredValue, setInputs)
              }
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
    paddingHorizontal: 20, 
  },
  text: {
    marginLeft: 40, 
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
    alignItems: 'center', 
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginBottom: 10, 
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
