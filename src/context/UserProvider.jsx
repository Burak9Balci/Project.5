import { createContext, useReducer, useEffect } from "react";
import userReducer, { initialState } from "../reducers/userReducer";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    document.body.style.backgroundColor = state.isDarkMode ? "#222" : "#fff";
  }, [state.isDarkMode]);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
