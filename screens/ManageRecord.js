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
          <Text>Exercise</Text>
          <TextInput 
            style={styles.input}
            placeholder="Exercise"
            onChangeText={inputChangedHandler.bind(this, 'exercise')}
            value={inputValues.exercise}
          />

          <Text>Record</Text> 
          <TextInput 
            style={styles.input}
            placeholder="Record"
            onChangeText={inputChangedHandler.bind(this, 'record')}
            value={inputValues.record}
          />

          <Text>Date</Text>
          <TextInput 
            style={styles.input}
            placeholder="YYYY-MM-DD"
            maxLength={10}
            onChangeText= {inputChangedHandler.bind(this, 'date')}
            value={inputValues.date}
          />

          <TouchableOpacity style= {styles.button} onPress={submitHandler}>
            <Text style= {styles.buttonText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style= {styles.button} onPress={deleteExpenseHandler}>
            <Ionicons name="trash" color="white" size={36} />
          </TouchableOpacity>

          <TouchableOpacity style= {styles.button} onPress={cancelHandler}>
            <Text style= {styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

        </>
      ) : (
        <>
          <Text>Exercise</Text>
          <TextInput 
            style={styles.input}
            placeholder="Exercise"
            onChangeText={inputChangedHandler.bind(this, 'exercise')}
            value={inputValues.exercise}
          />

          <Text>Record</Text> 
          <TextInput 
            style={styles.input}
            placeholder="Record"
            onChangeText={inputChangedHandler.bind(this, 'record')}
            value={inputValues.record}
          />

          <Text>Date</Text>
          <TextInput 
            style={styles.input}
            placeholder="YYYY-MM-DD"
            maxLength={10}
            onChangeText= {inputChangedHandler.bind(this, 'date')}
            value={inputValues.date}
          />

          <TouchableOpacity style= {styles.button} onPress={submitHandler}>
            <Text style= {styles.buttonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style= {styles.button} onPress={cancelHandler}>
            <Text style= {styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

        </>
      )}
    </View>
  );
}

export default ManageRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    marginBottom: 10
  },

  buttonText: {
    color: "white",
    fontSize: 12
  },

  text: {
    marginBottom: 20,
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
});
