import { createContext, useEffect, useReducer, useState } from "react";
import artworkFilterData from "../../data/artworkFilterData";
import { getAllArtworks } from "../../services/artworkService";
// Create a Context
const ArtworkContext = createContext();
const initialArtworksState = {
  records: [],
  info: {
    totalrecordsperquery: null,
    totalrecords: null,
    page: null,
    next: "",
    prev: "",
  },
  showArtwork: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "getArtworks/artworks":
      return {
        ...state,
        records: action.payload.records,
        info: action.payload.info,
      };
    case "getArtworkDetail/artworks":
      return { ...state, showArtwork: action.payload };
    default:
      break;
  }
};

// Create a Provider component
export const ArtworkProvider = ({ children }) => {
  const [{ records, info, showArtwork }, dispatch] = useReducer(
    reducer,
    initialArtworksState
  );
  const [artworks, setArtworks] = useState(initialArtworksState);
  const handleGetAllArtworks = async (query) => {
    try {
      const data = await getAllArtworks(query);
      dispatch({ type: "getArtworks/artworks", payload: data });
      //   dispatch({ type: "getArtworksInfo/artworks", payload: data.info });
    } catch (err) {
      console.error(err);
      console.log(`Unable to get all artworks | context`);
    }
  };

  useEffect(() => {
    handleGetAllArtworks();
  }, []);

  useEffect(() => {
console.log(records)
  },[records])
  return (
    <ArtworkContext.Provider
      value={{ artworkFilterData, handleGetAllArtworks, records, info, showArtwork }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContext;
