export const resetTimer = (setModalVisible, setTimerReset) => {
  setModalVisible(true);
  setTimerReset(true);
};


export const openModal = (exerciseId, setExerciseModalVisible) => {
  setExerciseModalVisible((prevState) => ({
    ...prevState,
    [exerciseId]: true,
  }));
};

export const closeModal = (exerciseId, setExerciseModalVisible) => {
  setExerciseModalVisible((prevState) => ({
    ...prevState,
    [exerciseId]: false,
  }));
};

export const toggleCheckbox = (exerciseId, setCheckboxChecked, checkboxChecked, setExerciseModalVisible) => {
  setCheckboxChecked((prevState) => !prevState);
  if (!checkboxChecked) {
    openModal(exerciseId, setExerciseModalVisible);
  } else {
    closeModal(exerciseId, setExerciseModalVisible);
  }
};