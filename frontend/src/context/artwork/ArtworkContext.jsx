/* eslint-disable no-case-declarations */
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
  century: {
    title: "Century",
    records: [],
  },
  classification: {
    title: "Classification",
    records: [],
  },
  culture: {
    title: "Culture",
    records: [],
  },
  medium: {
    title: "Medium",
    records: [],
  },
  period: {
    title: "Period",
    records: [],
  },
  technique: {
    title: "Technique",
    records: [],
  },
  worktype: {
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
    case "toggleCheckbox/artworks":
      console.log(action.payload);
      const { primaryCategoryKey, subCategoryId, name } = action.payload;

      return {
        ...state,
        [primaryCategoryKey]: {
          ...state[primaryCategoryKey],
          records: [
            state[primaryCategoryKey].records.map((record) => {
              if (record.id === subCategoryId && record.name === name) {
                return {
                  ...record,
                  isChecked: !record.isChecked,
                  clickCount: record.clickCount + 1,
                };
              } else {
                return { record };
              }
            }),
          ],
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
        culture: {
          ...state.culture,
          records: action.payload,
        },
      };
    case "getClassificationObjs/artworks":
      return {
        ...state,
        classification: {
          ...state.classification,
          records: action.payload,
        },
      };
    case "getWorktypeObjs/artworks":
      return {
        ...state,
        worktype: {
          ...state.worktype,
          records: action.payload,
        },
      };
    case "getMediumObjs/artworks":
      return {
        ...state,
        medium: {
          ...state.medium,
          records: action.payload,
        },
      };
    case "getCenturyObjs/artworks":
      return {
        ...state,
        century: {
          ...state.century,
          records: action.payload,
        },
      };
    case "getTechniqueObjs/artworks":
      return {
        ...state,
        technique: {
          ...state.technique,
          records: action.payload,
        },
      };
    case "getPeriodObjs/artworks":
      return {
        ...state,
        period: {
          ...state.period,
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
      century,
      classification,
      culture,
      displayView,
      info,
      isError,
      isLoading,
      medium,
      period,
      records,
      showArtwork,
      technique,
      worktype,
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

  const handleToggleCheckbox = (primaryCategoryKey, subCategoryId, name) => {
    primaryCategoryKey = primaryCategoryKey.toLowerCase();
 
    dispatch({
      type: "toggleCheckbox/artworks",
      payload: { primaryCategoryKey, subCategoryId, name },
    });
    console.log(medium)
  };

  ///////////////////////////
  // * FILTER CATEGORIES
  ///////////////////////////
  ///////////////////////////
  // GET CENTURIES
  ///////////////////////////
  const handleGetCenturyObjs = async () => {
    let data = [];

    try {
      const data1 = await getFilterObjs("century", 1);
      data.push(data1.records);
      data = data.flat();
      data.sort((a, b) => a.name.localeCompare(b.name));

      dispatch({
        type: "getCenturyObjs/artworks",
        payload: data,
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
    let data = [];

    try {
      const data1 = await getFilterObjs("classification", 1);

      data.push(data1.records);
      data = data.flat();
      data.sort((a, b) => a.name.localeCompare(b.name));
      console.log(data);
      dispatch({
        type: "getClassificationObjs/artworks",
        payload: data,
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
    let data = [];

    try {
      const data1 = await getFilterObjs("culture", 1);
      const data2 = await getFilterObjs("culture", 2);
      const data3 = await getFilterObjs("culture", 3);
      data.push(data1.records, data2.records, data3.records);
      data = data.flat();

      data.sort((a, b) => a.name.localeCompare(b.name));

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
    let data = [];

    try {
      const data1 = await getFilterObjs("medium", 1);
      const data2 = await getFilterObjs("medium", 2);
      const data3 = await getFilterObjs("medium", 3);
      const data4 = await getFilterObjs("medium", 4);

      data.push(data1.records, data2.records, data3.records, data4.records);
      data = data.flat();

      data.sort((a, b) => a.name.localeCompare(b.name));

      dispatch({
        type: "getMediumObjs/artworks",
        payload: data,
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
    let data = [];

    try {
      const data1 = await getFilterObjs("period", 1);
      const data2 = await getFilterObjs("period", 2);
      const data3 = await getFilterObjs("period", 3);
      const data4 = await getFilterObjs("period", 4);

      data.push(data1.records, data2.records, data3.records, data4.records);
      data = data.flat();

      data.sort((a, b) => a.name.localeCompare(b.name));

      dispatch({
        type: "getPeriodObjs/artworks",
        payload: data,
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
    let data = [];

    try {
      const data1 = await getFilterObjs("technique", 1);
      const data2 = await getFilterObjs("technique", 2);
      const data3 = await getFilterObjs("technique", 3);
      const data4 = await getFilterObjs("technique", 4);

      data.push(data1.records, data2.records, data3.records, data4.records);
      data = data.flat();

      data.sort((a, b) => a.name.localeCompare(b.name));

      dispatch({
        type: "getTechniqueObjs/artworks",
        payload: data,
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
    let data = [];

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
      data = data.flat();

      data.sort((a, b) => a.name.localeCompare(b.name));

      dispatch({
        type: "getWorktypeObjs/artworks",
        payload: data,
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
    century,
    classification,
    culture,
    medium,
    period,
    technique,
    worktype,
  ];

  return (
    <ArtworkContext.Provider
      value={{
        handleDisplayView,
        handleGetAllArtworks,
        handleRemoveFilter,
        handleResetFilterState,
        handleSelectFilters,
        handleToggleCheckbox,
        artworkFilterData,
        century,
        classification,
        culture,
        displayView,
        info,
        isError,
        isLoading,
        medium,
        period,
        records,
        showArtwork,
        technique,
        worktype,
        primaryCategories,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContext;
