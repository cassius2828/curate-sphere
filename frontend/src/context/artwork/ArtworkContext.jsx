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
  displayView: "",
  isLoading: false,
  isError: false,
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
    case "displayView/artworks":
      return { ...state, displayView: action.payload };
    case "startLoading/artworks":
      return { ...state, isLoading: true };
    case "stopLoading/artworks":
      return { ...state, isLoading: false };
    default:
      break;
  }
};

// Create a Provider component
export const ArtworkProvider = ({ children }) => {
  const [
    { records, info, showArtwork, isLoading, isError, displayView },
    dispatch,
  ] = useReducer(reducer, initialArtworksState);

  const handleGetAllArtworks = async (query) => {
    // starts loading
    dispatch({ type: "startLoading/artworks" });
    try {
      const data = await getAllArtworks(query);
      //   gets all info related to artworks (info and data)
      dispatch({ type: "getArtworks/artworks", payload: data });
    } catch (err) {
      console.error(err);
      console.log(`Unable to get all artworks | context`);
    } finally {
      // stops loading
      dispatch({ type: "stopLoading/artworks" });
    }
  };

  const handleDisplayView = (view) => {
    dispatch({ type: "displayView/artworks", payload: view });
  };

  useEffect(() => {
    handleGetAllArtworks();
  }, []);

  useEffect(() => {
    // console.log(records);
  }, [records]);
  return (
    <ArtworkContext.Provider
      value={{
        artworkFilterData,
        handleGetAllArtworks,
        handleDisplayView,
        records,
        info,
        showArtwork,
        isLoading,
        isError,
        displayView,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContext;
