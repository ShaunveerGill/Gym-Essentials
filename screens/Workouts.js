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
    goal
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

        }
      });
    }
  }, []);

  return  (
    <View>
      <Button title="Open Modal" onPress={openModal} />
      <TimerModal
        isVisible={modalVisible}
        onClose={closeModal}
        duration={60}
        onReset={resetTimer}
      />
    </View>
  );

}

export default Workouts;