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
          <Text>Edit Record</Text>

          <TouchableOpacity onPress={confirmHandler}>
            <Text>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={cancelHandler}>
            <Text>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteExpenseHandler}>
            <Ionicons name="trash" color="black" size={36} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Add Record</Text>

          <TouchableOpacity onPress={confirmHandler}>
            <Text>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={cancelHandler}>
            <Text>Cancel</Text>
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
});
