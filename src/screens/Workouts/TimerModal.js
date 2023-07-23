import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';

const TimerModal = ({ isVisible, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(-1); 
  const [inputTime, setInputTime] = useState('');

  const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

  useEffect(() => {
    // Reset the timer and input fields when the modal becomes visible
    if (isVisible) {
      setIsRunning(false);
      setRemainingTime(-1); // Reset to -1 instead of 0 to show "Enter a rest time" message 
      setInputTime('');
    }
  }, [isVisible]);

useEffect(() => {
  let timer;
  if (isRunning) {
    timer = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        
        // Prevent remainingTime from going below 0 so we display the correct message 
        const newRemainingTime = prevRemainingTime - 1;
        return newRemainingTime >= 0 ? newRemainingTime : 0;
      });
    }, 1000);
  }

  return () => {
    clearInterval(timer);
  };
}, [isRunning]);

  const startTimer = () => {
    const newTime = parseInt(inputTime, 10);
    if (!isNaN(newTime) && newTime > 0) {
      setRemainingTime(newTime);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setInputTime('');
    setRemainingTime(-1); 
  };

  const closeTimer = () => {
    setIsRunning(false);
    setInputTime('');
    onClose();
  };
  const circleSize = Math.min(deviceWidth, deviceHeight) * 0.6;

  const strokeWidth = 10;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressValue = ((remainingTime > 0 ? remainingTime : 0) / parseInt(inputTime, 10)) * circumference;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;


  const formattedTime =
  remainingTime === -1
    ? 'Enter a rest time'
    : remainingTime === 0
    ? 'Time is up!'
    : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

        
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeTimer}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 40,
          width: 350,
          height: 500,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Svg width={circleSize} height={circleSize}>
          <Circle
            stroke="#000000"
            fill="transparent"
            strokeWidth={strokeWidth}
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
          />
          <Circle
            stroke={remainingTime > 0 ? '#FF0000' : '#000000'}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progressValue}
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
          />
          <SvgText
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={20}
            fontWeight="bold"
          >
            {formattedTime}
           
          </SvgText>
        </Svg>
        {!isRunning && remainingTime <= 0 && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputTime}
                onChangeText={setInputTime}
                keyboardType="numeric"
                placeholder="Time (seconds)"
                placeholderTextColor="gray"
              />
            </View>
            <TouchableOpacity onPress={startTimer} style={styles.button1} >
              <Text style={styles.buttonText1}>Start</Text>
            </TouchableOpacity>
          </View>
        )}
        {isRunning && (
          <TouchableOpacity onPress={resetTimer} style={styles.button1} >
            <Text style={styles.buttonText1}>Reset</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={closeTimer} style={styles.button1} >
          <Text style={styles.buttonText1}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
button1: {
  backgroundColor: "black",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 25,
  alignItems: "center",
  justifyContent: "center",
  width: "30%",
  marginTop: 30,
  shadowColor: "#000",
  shadowOffset: {
    width: 2,
    height: 5,
  },
  shadowOpacity: 0.45, 
  shadowRadius: 3.84, 
  elevation: 5, 
},
buttonText1: {
  color: "white",
  fontSize: 18,
},
inputContainer: {
  width: '50%',
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  paddingHorizontal: 10,
},
input: {
  flex: 1,
  height: 40,
},
});

export default TimerModal;