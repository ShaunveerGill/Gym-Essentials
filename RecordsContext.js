import { createContext, useReducer } from "react";

const DUMMY_RECORDS = [
    {
      id: 'r1',
      exercise: 'Bench Press',
      record: '125 lbs',
      date: new Date('2021-12-19'),
    },
    {
      id: 'r2',
      exercise: 'Leg Press',
      record: '120 lbs',
      date: new Date('2021-12-19'),
    },
];

export const RecordsContext = createContext({
    records: [],
    addRecord: ({exercise, record, date}) => {},
    deleteRecord: (id) => {},
    updateRecord: (id, {exercise, record, date}) => {}
});

function recordsReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state];
        case 'UPDATE':
            const updatableRecordIndex = state.findIndex(
                (record) => record.id === action.payload.id
            );
            const updatableRecord = state[updatableRecordIndex];
            const updatedItem = { ...updatableRecord, ...action.payload.data};
            const updatedRecords = [...state];
            updatedRecords[updatableRecordIndex] = updatedItem;
            return updatedRecords;
        case 'DELETE':
            return state.filter((record) => record.id !== action.payload);
        default:
            return state;
    }
}

function RecordsContextProvider({children}) {
    const [recordsState, dispatch] = useReducer(recordsReducer, DUMMY_RECORDS);

    function addRecord(recordData) {
        dispatch({type: 'ADD', payload: recordData});
    }

    function updateRecord(id, recordData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: recordData}});
    }

    function deleteRecord(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    const value = {
        records: recordsState,
        addRecord: addRecord,
        updateRecord: updateRecord,
        deleteRecord: deleteRecord
    };

    return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
}

export {RecordsContextProvider}