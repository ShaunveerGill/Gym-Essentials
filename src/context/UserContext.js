// import React, { useState, createContext } from "react";

// const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   const [userEmail, setUserEmail] = useState('');
//   const [userName, setUserName] = useState('');
//   const [gender, setGender] = useState('');
//   const [age, setAge] = useState('');
//   const [height, setHeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [goal, setGoal] = useState('');
//   const [activityLevel, setActivityLevel] = useState('');

//   return (
//     <UserContext.Provider
//       value={{
//         userEmail,
//         setUserEmail,
//         userName,
//         setUserName,
//         gender,
//         setGender,
//         age,
//         setAge,
//         height,
//         setHeight,
//         weight,
//         setWeight,
//         goal,
//         setGoal,
//         activityLevel,
//         setActivityLevel,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserContextProvider };
import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");

  const clearUserContext = () => {
    //setUserEmail("");
    setUserName("");
    setGender("");
    setAge("");
    setHeight("");
    setWeight("");
    setGoal("");
    setActivityLevel("");
  };

  return (
    <UserContext.Provider
      value={{
        userEmail,
        setUserEmail,
        userName,
        setUserName,
        gender,
        setGender,
        age,
        setAge,
        height,
        setHeight,
        weight,
        setWeight,
        goal,
        setGoal,
        activityLevel,
        setActivityLevel,
        clearUserContext, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
