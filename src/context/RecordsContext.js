// import { createContext, useReducer } from "react";

// export const RecordsContext = createContext({
//     records: [],
//     addRecord: ({exercise, record, date}) => {},
//     setRecords: (records) => {},
//     deleteRecord: (id) => {},
//     updateRecord: (id, {exercise, record, date}) => {}
// });

// function recordsReducer(state, action) {
//     switch (action.type) {
//         case 'ADD':
//             return [action.payload, ...state];
//         case 'SET':
//             const inverted = action.payload.reverse();
//             return inverted;
//         case 'UPDATE':
//             const updatableRecordIndex = state.findIndex(
//                 (record) => record.id === action.payload.id
//             );
//             const updatableRecord = state[updatableRecordIndex];
//             const updatedItem = { ...updatableRecord, ...action.payload.data};
//             const updatedRecords = [...state];
//             updatedRecords[updatableRecordIndex] = updatedItem;
//             return updatedRecords;
//         case 'DELETE':
//             return state.filter((record) => record.id !== action.payload);
//         default:
//             return state;
//     }
// }

// function RecordsContextProvider({children}) {
//     const [recordsState, dispatch] = useReducer(recordsReducer, []);

//     function addRecord(recordData) {
//         dispatch({type: 'ADD', payload: recordData});
//     }

//     function setRecords(records) {
//         dispatch({type: 'SET', payload: records});
//     }

//     function updateRecord(id, recordData) {
//         dispatch({type: 'UPDATE', payload: {id: id, data: recordData}});
//     }

//     function deleteRecord(id) {
//         dispatch({type: 'DELETE', payload: id});
//     }

//     function clearRecords() {
//         dispatch({ type: 'SET', payload: [] });
//     }

//     const value = {
//         records: recordsState,
//         addRecord: addRecord,
//         setRecords: setRecords,
//         updateRecord: updateRecord,
//         deleteRecord: deleteRecord,
//         clearRecords: clearRecords,
//     };

//     return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
// }

// export {RecordsContextProvider}

import { createContext, useReducer } from "react";

export const RecordsContext = createContext({
  records: [],
  addRecord: ({ exercise, record, date }) => {},
  setRecords: (records) => {},
  deleteRecord: (id) => {},
  updateRecord: (id, { exercise, record, date }) => {},
});

function recordsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableRecordIndex = state.findIndex(
        (record) => record.id === action.payload.id
      );
      const updatableRecord = state[updatableRecordIndex];
      const updatedItem = { ...updatableRecord, ...action.payload.data };
      const updatedRecords = [...state];
      updatedRecords[updatableRecordIndex] = updatedItem;
      return updatedRecords;
    case "DELETE":
      return state.filter((record) => record.id !== action.payload);
    case "CLEAR": // Added case for clearing records
      return [];
    default:
      return state;
  }
}

function RecordsContextProvider({ children }) {
  const [recordsState, dispatch] = useReducer(recordsReducer, []);

  function addRecord(recordData) {
    dispatch({ type: "ADD", payload: recordData });
  }

  function setRecords(records) {
    dispatch({ type: "SET", payload: records });
  }

  function updateRecord(id, recordData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: recordData } });
  }

  function deleteRecord(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function clearRecords() {
    dispatch({ type: "CLEAR" }); // Dispatch the 'CLEAR' action to clear records
  }

  const value = {
    records: recordsState,
    addRecord: addRecord,
    setRecords: setRecords,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    clearRecords: clearRecords,
  };

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  );
}

export { RecordsContextProvider };
