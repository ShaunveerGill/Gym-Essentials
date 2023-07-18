import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';

const TimerModal = ({ isVisible, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [inputTime, setInputTime] = useState('');

  const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
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
    setRemainingTime(0);
  };

  const closeTimer = () => {
    setIsRunning(false);
    setInputTime('');
    onClose();
  };

  const circleSize = Math.min(deviceWidth, deviceHeight) * 0.6;
  const squareSize = circleSize * 1.5;

  const strokeWidth = 10;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressValue = ((remainingTime > 0 ? remainingTime : 0) / parseInt(inputTime, 10)) * circumference;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  const buttonStyle = {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  };

  const textStyle = {
    color: 'black',
  };

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
            fontSize={30}
            fontWeight="bold"
          >
            {remainingTime > 0 ? formattedTime : 'Time is up!'}
          </SvgText>
        </Svg>
        {!isRunning && remainingTime <= 0 && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TextInput
              style={{ ...buttonStyle, width: '80%', marginBottom: 10, textAlign: 'center' }}
              value={inputTime}
              onChangeText={setInputTime}
              keyboardType="numeric"
              placeholder="Time (seconds)"
            />
            <TouchableOpacity onPress={startTimer} style={buttonStyle}>
              <Text style={textStyle}>Start</Text>
            </TouchableOpacity>
          </View>
        )}
        {isRunning && (
          <TouchableOpacity onPress={resetTimer} style={[buttonStyle, { marginTop: 20 }]}>
            <Text style={textStyle}>Reset</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={closeTimer} style={[buttonStyle, { marginTop: 20 }]}>
          <Text style={textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default TimerModal;
