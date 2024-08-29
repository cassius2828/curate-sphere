import { createContext, useState } from "react";

import { getUser, signout } from "../../services/authService";
///////////////////////////
// Context Creation
///////////////////////////
const GlobalContext = createContext();

///////////////////////////
// Provider
///////////////////////////
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [isLoading, setIsLoading] = useState(false);
  ///////////////////////////
  // Sign Out
  ///////////////////////////
  const handleSignout = () => {
    signout();
    setUser(null);
  };

  ///////////////////////////
  // Format Date
  ///////////////////////////
  const formatDate = (date) => {
    let formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const formatDateForEdit = (dateString) => {
    if (!dateString) return ""; 
    return dateString.split("T")[0]; 
  };

  ///////////////////////////
  // Scroll to Top
  ///////////////////////////
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        handleSignout,
        formatDate,
        formatDateForEdit,
        scrollToTop,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
