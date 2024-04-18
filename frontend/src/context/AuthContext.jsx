import { createContext, useContext, useState } from "react";
import addDeleteGetLocalStorage from "../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../common/LocalVariable";

// for creating the context
export const AuthContext = createContext();

// for consuming the context
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// for providing the context
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(addDeleteGetLocalStorage(STORAGE?.USER_DATA, {}, "get")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
