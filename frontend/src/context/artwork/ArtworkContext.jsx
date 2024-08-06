import { createContext, useEffect, useReducer } from "react";
import artworkFilterData from "../../../data/artworkFilterData";
import { getAllArtworks, getFilterObjs } from "../../services/artworkService";
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
  artFilter: {
    size: "12",
  },
  centuries: {
    title: "Century",
    records: [],
  },
  classifications: {
    title: "Classification",
    records: [],
  },
  cultures: {
    title: "Culture",
    records: [],
  },
  mediums: {
    title: "Medium",
    records: [],
  },
  periods: {
    title: "Period",
    records: [],
  },
  techniques: {
    title: "Technique",
    records: [],
  },
  worktypes: {
    title: "Work Type",
    records: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    // Artworks
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
    // Loading State
    case "startLoading/artworks":
      return { ...state, isLoading: true };
    case "stopLoading/artworks":
      return { ...state, isLoading: false };
    // Filter Section
    case "filterArtworks/artworks":
      return {
        ...state,
        artFilter: {
          ...state.artFilter,
          [action.payload[0]]: action.payload[1],
        },
      };
    case "removeFilterArtworks/artworks":
      return {
        ...state,
        artFilter: action.payload,
      };
    case "resetFilterState/artworks":
      return {
        ...state,
        artFilter: {
          size: "12",
        },
      };
    // Filter Categories
    case "getCultureObjs/artworks":
      return {
        ...state,
        cultures: {
          ...state.cultures,
          records: action.payload,
        },
      };
    case "getClassificationObjs/artworks":
      return {
        ...state,
        classifications: {
          ...state.classifications,
          records: action.payload,
        },
      };
    case "getWorktypeObjs/artworks":
      return {
        ...state,
        worktypes: {
          ...state.worktypes,
          records: action.payload,
        },
      };
    case "getMediumObjs/artworks":
      return {
        ...state,
        mediums: {
          ...state.mediums,
          records: action.payload,
        },
      };
    case "getCenturyObjs/artworks":
      return {
        ...state,
        centuries: {
          ...state.centuries,
          records: action.payload,
        },
      };
    case "getTechniqueObjs/artworks":
      return {
        ...state,
        techniques: {
          ...state.techniques,
          records: action.payload,
        },
      };
    case "getPeriodObjs/artworks":
      return {
        ...state,
        periods: {
          ...state.periods,
          records: action.payload,
        },
      };
    default:
      return state;
  }
};

// Create a Provider component
export const ArtworkProvider = ({ children }) => {
  const [
    {
      artFilter,
      centuries,
      classifications,
      cultures,
      displayView,
      info,
      isError,
      isLoading,
      mediums,
      periods,
      records,
      showArtwork,
      techniques,
      worktypes,
    },
    dispatch,
  ] = useReducer(reducer, initialArtworksState);

  ///////////////////////////
  // Get All Artworks
  ///////////////////////////
  const handleGetAllArtworks = async () => {
    // starts loading
    dispatch({ type: "startLoading/artworks" });
    try {
      const data = await getAllArtworks(artFilter);
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
  ///////////////////////////
  // Display View of Artworks
  ///////////////////////////
  const handleDisplayView = (view) => {
    dispatch({ type: "displayView/artworks", payload: view });
  };

  ///////////////////////////
  // Add Filter to Query
  ///////////////////////////
  const handleSelectFilters = async (key, id) => {
    key = key.toLowerCase();
    if (key[0] === "w") {
      key = key.split(" ").join("");
    }
    const arr = [key, id];
    dispatch({ type: "filterArtworks/artworks", payload: arr });

    console.log(arr, " <-- arr");
    console.log(artFilter, " <-- art filter");
  };

  ///////////////////////////
  // Remove Filter From Query
  ///////////////////////////
  const handleRemoveFilter = (key, id) => {
    // const { [action.payload]: _, ...newArtFilter } = state.artFilter;
    key = key.toLowerCase();
    if (key[0] === "w") {
      key = key.split(" ").join("");
    }
    console.log(key, "<-- remove filter key");
    console.log(id, "<-- remove filter id");

    if (artFilter[key] === id) {
      const { [key]: _, ...removedFilterObj } = artFilter;
      console.log("this key value pair exists");
      dispatch({
        type: "removeFilterArtworks/artworks",
        payload: removedFilterObj,
      });
    }
  };

  const handleResetFilterState = () => {
    dispatch({ type: "resetFilterState/artworks" });
  };
  ///////////////////////////
  // * FILTER CATEGORIES
  ///////////////////////////
  ///////////////////////////
  // GET CENTURIES
  ///////////////////////////
  const handleGetCenturyObjs = async () => {
    const data = [];

    try {
      const data1 = await getFilterObjs("century", 1);

      data.push(data1.records);
      dispatch({
        type: "getCenturyObjs/artworks",
        payload: data.flat(),
      });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch century objs | context`);
    }
  };

  ///////////////////////////
  // GET CLASSIFICATIONS
  ///////////////////////////
  const handleGetClassificationObjs = async () => {
    const data = [];

    try {
      const data1 = await getFilterObjs("classification", 1);

      data.push(data1.records);
      dispatch({
        type: "getClassificationObjs/artworks",
        payload: data.flat(),
      });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch classification objs | context`);
    }
  };

  ///////////////////////////
  // GET CULTURES
  ///////////////////////////
  const handleGetCultureObjs = async () => {
    const data = [];

    try {
      const data1 = await getFilterObjs("culture", 1);
      const data2 = await getFilterObjs("culture", 2);
      const data3 = await getFilterObjs("culture", 3);
      data.push(data1.records, data2.records, data3.records);
      dispatch({ type: "getCultureObjs/artworks", payload: data.flat() });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch culture objs | context`);
    }
  };

  ///////////////////////////
  // GET MEDIUMS
  ///////////////////////////
  const handleGetMediumObjs = async () => {
    const data = [];

    try {
      const data1 = await getFilterObjs("medium", 1);
      const data2 = await getFilterObjs("medium", 2);
      const data3 = await getFilterObjs("medium", 3);
      const data4 = await getFilterObjs("medium", 4);

      data.push(data1.records, data2.records, data3.records, data4.records);
      dispatch({
        type: "getMediumObjs/artworks",
        payload: data.flat(),
      });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch medium objs | context`);
    }
  };

  ///////////////////////////
  // GET PERIODS
  ///////////////////////////
  const handleGetPeriodObjs = async () => {
    const data = [];

    try {
      const data1 = await getFilterObjs("period", 1);
      const data2 = await getFilterObjs("period", 2);
      const data3 = await getFilterObjs("period", 3);
      const data4 = await getFilterObjs("period", 4);

      data.push(data1.records, data2.records, data3.records, data4.records);
      dispatch({
        type: "getPeriodObjs/artworks",
        payload: data.flat(),
      });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch period objs | context`);
    }
  };

  ///////////////////////////
  // GET TECHNIQUES
  ///////////////////////////
  const handleGetTechniqueObjs = async () => {
    const data = [];

    try {
      const data1 = await getFilterObjs("technique", 1);
      const data2 = await getFilterObjs("technique", 2);
      const data3 = await getFilterObjs("technique", 3);
      const data4 = await getFilterObjs("technique", 4);

      data.push(data1.records, data2.records, data3.records, data4.records);
      dispatch({
        type: "getTechniqueObjs/artworks",
        payload: data.flat(),
      });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch technique objs | context`);
    }
  };

  ///////////////////////////
  // GET WORKTYPES
  ///////////////////////////
  const handleGetWorktypeObjs = async () => {
    const data = [];

    try {
      const data1 = await getFilterObjs("worktype", 1);
      const data2 = await getFilterObjs("worktype", 2);
      const data3 = await getFilterObjs("worktype", 3);
      const data4 = await getFilterObjs("worktype", 4);
      const data5 = await getFilterObjs("worktype", 5);

      data.push(
        data1.records,
        data2.records,
        data3.records,
        data4.records,
        data5.records
      );
      dispatch({
        type: "getWorktypeObjs/artworks",
        payload: data.flat(),
      });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch worktype objs | context`);
    }
  };

  useEffect(() => {
    handleGetAllArtworks();
  }, [artFilter]);

  ///////////////////////////
  // Get initial Filter Values from api
  ///////////////////////////
  useEffect(() => {
    // Fetches and processes culture objects
    handleGetCultureObjs();
    // Fetches and processes classification objects
    handleGetClassificationObjs();
    // Fetches and processes work type objects
    handleGetWorktypeObjs();
    // Fetches and processes medium objects
    handleGetMediumObjs();
    // Fetches and processes century objects
    handleGetCenturyObjs();
    // Fetches and processes technique objects
    handleGetTechniqueObjs();
    // Fetches and processes period objects
    handleGetPeriodObjs();
  }, []);

  const primaryCategories = [
    centuries,
    classifications,
    cultures,
    mediums,
    periods,
    techniques,
    worktypes,
  ];

  return (
    <ArtworkContext.Provider
      value={{
        artworkFilterData,
        centuries,
        classifications,
        cultures,
        displayView,
        handleDisplayView,
        handleGetAllArtworks,
        handleRemoveFilter,
        handleResetFilterState,
        handleSelectFilters,
        info,
        isError,
        isLoading,
        mediums,
        periods,
        records,
        showArtwork,
        techniques,
        worktypes,
        primaryCategories,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContext;
