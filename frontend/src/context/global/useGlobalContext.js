import { useContext } from "react";
import GlobalContext from "./GlobalContext";

const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

export default useGlobalContext;
