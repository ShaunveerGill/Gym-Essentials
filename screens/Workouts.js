import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import TimerModal from './TimerModal';


function Workouts() {
  const [modalVisible, setModalVisible] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    setTimerReset(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const resetTimer = () => {
    setModalVisible(true);
    setTimerReset(true);
  };

  const toggleCheckbox = () => {
    setCheckboxChecked(!checkboxChecked);
    if (!checkboxChecked) {
      setModalVisible(true);
      setTimerReset(false);
    }
  };

  const {
    userEmail,
    setUserEmail,
    userName,
    setUserName,
    gender,
    setGender,
    setAge,
    age,
    setHeight,
    height,
    setWeight,
    weight,
    setGoal,
    goal,
    activityLevel,
    setActivityLevel,
  } = useContext(UserContext); 

  useEffect(() => {
    const user = auth.currentUser;

    if (user !== null) {
      setUserEmail(user.email);
      const db = getDatabase();
      const userRef = ref(db, "users/" + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setUserName(data.name);
          setGender(data.gender);
          setAge(data.age);
          setHeight(data.height);
          setWeight(data.weight);
          setGoal(data.goal);
          setActivityLevel(data.activityLevel);
        }
      });
    }
  }, []);

  return  (
    <View>
      <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
        {checkboxChecked ? (
          <Text style={styles.checkboxText}>✓</Text>
        ) : (
          <Text style={styles.checkboxText}>☐</Text>
        )}
      </TouchableOpacity>
      <TimerModal
        isVisible={modalVisible}
        onClose={closeModal}
        duration={60}
        onReset={resetTimer}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 1,
    borderColor: "black",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 18,
  },
});

export default Workouts;
