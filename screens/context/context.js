import { createContext } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  return (
    <UserContext.Provider value={{ item: 1 }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
