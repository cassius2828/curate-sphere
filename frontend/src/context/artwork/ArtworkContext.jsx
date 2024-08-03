import { createContext, useEffect } from "react";
import artworkFilterData from "../../data/artworkFilterData";
// Create a Context
const ArtworkContext = createContext();

// Create a Provider component
export const ArtworkProvider = ({ children }) => {
  return (
    <ArtworkContext.Provider value={{ artworkFilterData }}>
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContext;
