// src/context/UserContext.jsx
import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

const UserContext = createContext();

export function UserProvider({ children }) {
  const auth = useAuth(); // { isAuthenticated, user, refreshUser, ... }
  return (
    <UserContext.Provider value={auth}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
