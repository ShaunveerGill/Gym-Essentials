import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';

const TimerModal = ({ isVisible, onClose, duration, onReset }) => {
  const [progress, setProgress] = useState(1);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration);

  const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1 / duration);
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  useEffect(() => {
    if (progress <= 0) {
      setProgress(0);
      setTimerCompleted(true);
    }
  }, [progress]);

  const resetTimer = () => {
    setProgress(1);
    setRemainingTime(duration);
    setTimerCompleted(false);
    onReset();
  };

  const skipTimer = () => {
    setProgress(0);
    setRemainingTime(0);
    setTimerCompleted(true);
  };

  const addTime = () => {
    setRemainingTime((prevRemainingTime) => prevRemainingTime + 10);
  };

  const subtractTime = () => {
    if (remainingTime >= 10) {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }
  };

  const circleSize = Math.min(deviceWidth, deviceHeight) * 0.6;
  const squareSize = circleSize * 1.5;

  const strokeWidth = 10;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressValue = progress * circumference;

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
      onBackdropPress={timerCompleted ? onClose : undefined}
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
          width: squareSize,
          height: squareSize,
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
            stroke={timerCompleted ? '#000000' : '#FF0000'}
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
        {timerCompleted ? (
          <TouchableOpacity onPress={resetTimer} style={[buttonStyle, { marginTop: 20 }]}>
            <Text style={textStyle}>Reset</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity onPress={subtractTime} style={buttonStyle}>
              <Text style={textStyle}>-10s</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addTime} style={[buttonStyle, { marginLeft: 10 }]}>
              <Text style={textStyle}>+10s</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipTimer} style={[buttonStyle, { marginLeft: 10 }]}>
              <Text style={textStyle}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={[buttonStyle, { marginLeft: 10 }]}>
              <Text style={textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default TimerModal;
