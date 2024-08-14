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
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  ///////////////////////////
  // Scroll to Top
  ///////////////////////////
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <GlobalContext.Provider
      value={{ user, setUser, handleSignout, formatDate, formatDateForEdit,scrollToTop }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
