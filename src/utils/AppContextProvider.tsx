import { createContext, useState, ReactNode } from "react";
import { type User, type AppContextType } from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User[]>([]);

  const contextValue = {
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
