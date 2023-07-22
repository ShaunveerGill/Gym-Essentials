import { useState } from "react";

  export function ChangedHandler(inputIdentifier, enteredValue, setInputs) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  
  export const useExerciseInputs = (selectedExercise) => {
    const [inputs, setExerciseInputs] = useState({
      exerciseName: {
        value: selectedExercise ? selectedExercise.exerciseName : "",
        isValid: true,
      },
      sets: {
        value: selectedExercise ? selectedExercise.sets : "",
        isValid: true,
      },
      reps: {
        value: selectedExercise ? selectedExercise.reps : "",
        isValid: true,
      },
    });
  
    const inputChangedHandler = (inputIdentifier, enteredValue) => {
      let isValid = true;
  
      if (enteredValue.trim().length === 0) {
        isValid = false;
      }
  
      setExerciseInputs((curInputs) => ({
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: isValid },
      }));
    };
  
    return { inputs, setExerciseInputs, inputChangedHandler };
  };
  
