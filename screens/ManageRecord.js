import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function ManageRecord({ route }) {
  const navigation = useNavigation();
  const editedRecordId = route.params?.recordId;
  const isEditing = !!editedRecordId;

  function deleteExpenseHandler() {
    navigation.navigate('PersonalRecords')
  }
  
  function cancelHandler() {
    navigation.navigate('PersonalRecords')
  }

  function confirmHandler() {
    navigation.navigate('PersonalRecords')
  }

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
        
          <TouchableOpacity style= {styles.button} onPress={confirmHandler}>
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
          <Text style= {styles.buttonText}>Add Record</Text>

          <TouchableOpacity style= {styles.button} onPress={confirmHandler}>
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

  }
});
