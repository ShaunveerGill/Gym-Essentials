import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("some");
  const [userName, setUserName] = useState("some");
  const [gender, setGender] = useState("none");
  const [age, setAge] = useState("none");
  const [height, setHeight] = useState("none");
  const [weight, setWeight] = useState("none");
  const [goal, setGoal] = useState("none");
  return (
    <UserContext.Provider value={{userEmail, setUserEmail, userName, setUserName, gender, setGender, setAge, age, setHeight, height, setWeight, weight, setGoal, goal }}>
      {children}
    </UserContext.Provider>
  );
}

export {UserContext, UserContextProvider}