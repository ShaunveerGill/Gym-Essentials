import React, { createContext, useReducer } from "react";

export const WorkoutsContext = createContext({
  workouts: [],
  addWorkout: ({ workoutName }) => {},
  setWorkouts: (workouts) => {},
  deleteWorkout: (id) => {},
  updateWorkout: (id, { workoutName }) => {}
});

function workoutsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableWorkoutIndex = state.findIndex(
        (workout) => workout.id === action.payload.id
      );
      const updatableWorkout = state[updatableWorkoutIndex];
      const updatedItem = { ...updatableWorkout, ...action.payload.data };
      const updatedWorkouts = [...state];
      updatedWorkouts[updatableWorkoutIndex] = updatedItem;
      return updatedWorkouts;
    case 'DELETE':
      return state.filter((workout) => workout.id !== action.payload);
    default:
      return state;
  }
}

function WorkoutsContextProvider({ children }) {
  const [workoutsState, dispatch] = useReducer(workoutsReducer, []);

  function addWorkout(workoutData) {
    dispatch({ type: 'ADD', payload: workoutData });
  }

  function setWorkouts(workouts) {
    dispatch({ type: 'SET', payload: workouts });
  }

  function updateWorkout(id, workoutData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: workoutData } });
  }

  function deleteWorkout(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  const value = {
    workouts: workoutsState,
    addWorkout: addWorkout,
    setWorkouts: setWorkouts,
    updateWorkout: updateWorkout,
    deleteWorkout: deleteWorkout
  };

  return <WorkoutsContext.Provider value={value}>{children}</WorkoutsContext.Provider>;
}

export { WorkoutsContextProvider };