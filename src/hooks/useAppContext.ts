import { useContext } from "react";
import AppContext from "../utils/AppContextProvider";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
