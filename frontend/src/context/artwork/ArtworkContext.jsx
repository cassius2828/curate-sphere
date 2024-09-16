/* eslint-disable no-case-declarations */
import { createContext, useEffect, useReducer, useState } from "react";
import {
  getAllArtworks,
  getArtworkBySearch,
  getFilterObjs,
  postNextPageOfArtworks,
} from "../../services/artworkService";

///////////////////////////
// Context Creation
///////////////////////////
const ArtworkContext = createContext();

///////////////////////////
// Initial State
///////////////////////////
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
  showArtworkInfoLists: [],
  displayView: "",
  isLoading: false,
  isError: false,
  artFilter: {
    size: "12",
  },
  searchQuery: "",
  century: {
    title: "Century",
    records: {},
  },
  classification: {
    title: "Classification",
    records: {},
  },
  culture: {
    title: "Culture",
    records: {},
  },
  medium: {
    title: "Medium",
    records: {},
  },
  period: {
    title: "Period",
    records: {},
  },
  technique: {
    title: "Technique",
    records: {},
  },
  worktype: {
    title: "Work Type",
    records: {},
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
    case "getArworksBySearch/artworks":
      return {
        ...state,
        records: action.payload.records,
        info: action.payload.info,
      };
    case "updateSearchQuery/artworks":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "postNextPageOfArtworks/artworks":
      return {
        ...state,
        records: [...state.records, ...action.payload.records],
        info: action.payload.info,
      };
    case "getArtworkDetail/artworks":
      return { ...state, showArtwork: action.payload };
    case "setShowArtworkInfoLists/artworks":
      return { ...state, showArtworkInfoLists: action.payload };
    case "displayView/artworks":
      return { ...state, displayView: action.payload };
    // Loading State
    case "startLoading/artworks":
      return { ...state, isLoading: true };
    case "stopLoading/artworks":
      return { ...state, isLoading: false };
    // Filter Section
    case "updateSizeFilter/artworks":
     
      return {
        ...state,
        artFilter: {
          ...state.artFilter,
          size: action.payload.value,
        },
      };
    // Filter Section
    case "handleFilterObjectUpdate/artworks":
      return {
        ...state,
        artFilter: action.payload,
      };
    case "toggleCheckbox/artworks":
      const {
        primaryCategoryKey,
        subcategoryKey,
        updatedIsChecked,
        updatedClickCount,
      } = action.payload;
      console.log(action.payload, "<-- action.payload");
    

      return {
        ...state,
        [primaryCategoryKey]: {
          // spread the state of the category | keep title, update records
          ...state[primaryCategoryKey],
          //  find matching key-value from payload
          records: {
            ...state[primaryCategoryKey].records,
            [subcategoryKey]: {
              ...state[primaryCategoryKey].records[subcategoryKey],
              isChecked: updatedIsChecked,
              clickCount: updatedClickCount,
            },
          },
        },
      };
    case "removeFilterArtworks/artworks":
      return {
        ...state,
        // replace current filter with new filter that does not contain the key-value passed in the function that
        // calls dispatch
        artFilter: action.payload,
      };
    case "resetFilterState/artworks":
      return {
        ...state,

        artFilter: {
          size: "12",
        },
        searchQuery: "",
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

///////////////////////////
// Provider
///////////////////////////
export const ArtworkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialArtworksState);

  const {
    artFilter,
    searchQuery,
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
    showArtworkInfoLists,
  } = state;
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

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
  // Get Artworks By Search
  ///////////////////////////
  const handleSearchArtworksByTitle = async (query, filter) => {
    // begins search when query is at least 3 chars long

    if (query.length > 2) {
      // start loading
      dispatch({ type: "startLoading/artworks" });
      try {
        // fetch artworks by search
        const data = await getArtworkBySearch(query, filter);
        dispatch({ type: "getArworksBySearch/artworks", payload: data });
      } catch (err) {
        console.error(err);
        console.log(
          `Unable to get artworks by the following search: ${query} | context`
        );
      } finally {
        // stops loading
        dispatch({ type: "stopLoading/artworks" });
      }
    }

    // resets results if user cleared search
    if (query.length === 0) {
      await handleGetAllArtworks();
    }
  };

  ///////////////////////////
  // Get Next Page of Artworks
  ///////////////////////////
  const handleGetNextPageOfArtworks = async () => {
    // starts loading
    dispatch({ type: "startLoading/artworks" });
    try {
      // making this a post so I can send info.next in the body to keep API key secure
      const data = await postNextPageOfArtworks(info.next);
      //   gets all info related to artworks (info and data)
      dispatch({ type: "postNextPageOfArtworks/artworks", payload: data });
    } catch (err) {
      console.error(err);
      console.log(`Unable to get next page of artworks | context`);
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
  // Toggle filter dropdown visibility || Filter
  ///////////////////////////
  const handleShowDropdown = (allFiltersLoaded, reset) => {
    if (allFiltersLoaded && reset) {
      setShowFilterDropdown(false);
    }
    if (allFiltersLoaded) {
      return setShowFilterDropdown((prev) => !prev);
    } else {
      return alert("Filters are still loading...");
    }
  };

  ///////////////////////////
  // Reset Filter State
  ///////////////////////////
  const handleResetFilterState = () => {
    // any used filters must have thier clickcount and checkbox status reset
    const checkboxesToReset = {};
    for (let primaryCategory in artFilter) {
      if (primaryCategory !== "size") {
        checkboxesToReset[primaryCategory] = artFilter[primaryCategory];
      }
    }

    const arrayOfCheckboxFilterValues = Object.entries(checkboxesToReset);

    arrayOfCheckboxFilterValues.forEach((category) => {
      const categoryObjs = category[1];

      for (let obj in categoryObjs) {
        const formattedKeyName = obj.toLowerCase().replace(/[\s.,]/g, ""); // Maintain the access point as the id
        console.log(formattedKeyName, " <--formattedKeyName");

        state[category[0]].records[formattedKeyName] = {
          ...state[category[0]].records[formattedKeyName],
          isChecked: false,
          clickCount: 0,
        };
      }
    });
    handleShowDropdown("reset");
    dispatch({ type: "resetFilterState/artworks" });
  };
  ///////////////////////////
  // Toggle Checkbox State
  ///////////////////////////
  const handleToggleCheckbox = (
    primaryCategoryKey,
    subCategoryId,
    subcategoryKey,
    updatedIsChecked,
    updatedClickCount
  ) => {
    primaryCategoryKey = primaryCategoryKey.toLowerCase();
    if (primaryCategoryKey === "work type") {
      // primaryCategoryKey = "worktype";
    }
    const formattedKeyName = subcategoryKey
      .toLowerCase()
      .replace(/[\s.,]/g, ""); // Maintain the access point as the id
console.log(artFilter, ' <-- artFilter')
    dispatch({
      type: "toggleCheckbox/artworks",
      payload: {
        primaryCategoryKey,
        subCategoryId,
        updatedIsChecked,
        updatedClickCount,
        subcategoryKey: formattedKeyName,
      },
    });
  };

  ///////////////////////////
  // * FILTER CATEGORIES
  ///////////////////////////
  /*
  //* All filter functions follow the same structure
  1. store data for each page in variable | async func from service to retrieve data from harvard api
  2. push all data into array
  3. flatten array
  4. sort data by name
  5. dispatch to appropriate case in reducer
  */
  ///////////////////////////
  // GET CENTURIES
  ///////////////////////////
  const handleGetCenturyObjs = async () => {
    try {
      const data1 = await getFilterObjs("century", 1);
      let data = [...data1.records];
      // Sort data by name
      const sortedArray = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      // Reconstruct the object using the sorted array
      const sortedData = sortedArray.reduce((acc, item) => {
        acc[item.name.toLowerCase().replace(/[\s.,]/g, "")] = {
          ...item,
          isChecked: false,
          clickCount: 0,
        }; // Maintain the access point as the id
        return acc;
      }, {});
      dispatch({
        type: "getCenturyObjs/artworks",
        payload: sortedData,
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
    try {
      const data1 = await getFilterObjs("classification", 1);

      let data = [...data1.records];
      // Sort data by name
      const sortedArray = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      // Reconstruct the object using the sorted array
      const sortedData = sortedArray.reduce((acc, item) => {
        acc[item.name.toLowerCase().replace(/[\s.,]/g, "")] = {
          ...item,
          isChecked: false,
          clickCount: 0,
        }; // Maintain the access point as the id
        return acc;
      }, {});
      dispatch({
        type: "getClassificationObjs/artworks",
        payload: sortedData,
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
    try {
      const data1 = await getFilterObjs("culture", 1);
      const data2 = await getFilterObjs("culture", 2);
      const data3 = await getFilterObjs("culture", 3);
      let data = [...data1.records, ...data2.records, ...data3.records];
      // Sort data by name
      const sortedArray = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      // Reconstruct the object using the sorted array
      const sortedData = sortedArray.reduce((acc, item) => {
        acc[item.name.toLowerCase().replace(/[\s.,]/g, "")] = {
          ...item,
          isChecked: false,
          clickCount: 0,
        }; // Maintain the access point as the id
        return acc;
      }, {});
      dispatch({ type: "getCultureObjs/artworks", payload: sortedData });
      return sortedData;
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch culture objs | context`);
    }
  };

  ///////////////////////////
  // GET MEDIUMS
  ///////////////////////////
  const handleGetMediumObjs = async () => {
    try {
      console.log("Starting to fetch medium objects...");

      // Fetch data from API or backend service
      const data1 = await getFilterObjs("medium", 1);

      const data2 = await getFilterObjs("medium", 2);

      const data3 = await getFilterObjs("medium", 3);

      const data4 = await getFilterObjs("medium", 4);

      // Merge all data records into one object
      let data = [
        ...data1.records,
        ...data2.records,
        ...data3.records,
        ...data4.records,
      ];

      // Sort data by name
      const sortedArray = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      // Reconstruct the object using the sorted array
      const sortedData = sortedArray.reduce((acc, item) => {
        acc[item.name.toLowerCase().replace(/[\s.,]/g, "")] = {
          ...item,
          isChecked: false,
          clickCount: 0,
        }; // Maintain the access point as the id
        return acc;
      }, {});

      dispatch({
        type: "getMediumObjs/artworks",
        payload: sortedData,
      });

      console.log("Medium objects fetched and sorted successfully.");
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch medium objs | context`);
    }
  };

  ///////////////////////////
  // GET PERIODS
  ///////////////////////////
  const handleGetPeriodObjs = async () => {
    try {
      const data1 = await getFilterObjs("period", 1);
      const data2 = await getFilterObjs("period", 2);
      const data3 = await getFilterObjs("period", 3);
      const data4 = await getFilterObjs("period", 4);

      let data = [
        ...data1.records,
        ...data2.records,
        ...data3.records,
        ...data4.records,
      ];

      // Sort data by name
      const sortedArray = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      // Reconstruct the object using the sorted array
      const sortedData = sortedArray.reduce((acc, item) => {
        acc[item.name.toLowerCase().replace(/[\s.,]/g, "")] = {
          ...item,
          isChecked: false,
          clickCount: 0,
        }; // Maintain the access point as the id
        return acc;
      }, {});
      dispatch({
        type: "getPeriodObjs/artworks",
        payload: sortedData,
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
    try {
      const data1 = await getFilterObjs("technique", 1);
      const data2 = await getFilterObjs("technique", 2);
      const data3 = await getFilterObjs("technique", 3);
      const data4 = await getFilterObjs("technique", 4);

      let data = [
        ...data1.records,
        ...data2.records,
        ...data3.records,
        ...data4.records,
      ];

      // Sort data by name
      const sortedArray = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      // Reconstruct the object using the sorted array
      const sortedData = sortedArray.reduce((acc, item) => {
        acc[item.name.toLowerCase().replace(/[\s.,]/g, "")] = {
          ...item,
          isChecked: false,
          clickCount: 0,
        }; // Maintain the access point as the id
        return acc;
      }, {});
      dispatch({
        type: "getTechniqueObjs/artworks",
        payload: sortedData,
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
    try {
      const data1 = await getFilterObjs("worktype", 1);
      const data2 = await getFilterObjs("worktype", 2);
      const data3 = await getFilterObjs("worktype", 3);
      const data4 = await getFilterObjs("worktype", 4);
      const data5 = await getFilterObjs("worktype", 5);

      let data = [
        ...data1.records,
        ...data2.records,
        ...data3.records,
        ...data4.records,
        ...data5.records,
      ];

      // Sort data by name
      const sortedArray = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      // Reconstruct the object using the sorted array
      const sortedData = sortedArray.reduce((acc, item) => {
        acc[item.name.toLowerCase().replace(/[\s.,]/g, "")] = {
          ...item,
          isChecked: false,
          clickCount: 0,
        }; // Maintain the access point as the id
        return acc;
      }, {});
      dispatch({
        type: "getWorktypeObjs/artworks",
        payload: sortedData,
      });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch worktype objs | context`);
    }
  };
  ///////////////////////////
  // Handle Update Search Query
  ///////////////////////////
  const handleUpdateSearchQuery = (query) => {
    dispatch({ type: "updateSearchQuery/artworks", payload: query });
  };

  ///////////////////////////
  // Handle Filter Object
  ///////////////////////////
  const handleFilterObj = (
    primaryCategory,
    subcategoryKey,
    subcategoryValue
  ) => {
    let updatedArtFilter = { ...artFilter };
    // is medium not in artFilter?
    if (!(primaryCategory in updatedArtFilter)) {
      // then add medium: {oil:2345}
      updatedArtFilter[primaryCategory] = {
        [subcategoryKey]: subcategoryValue,
      };
    } else {
      // medium is in artFilter? Check if the subCategory is already in medium
      if (!(subcategoryKey in updatedArtFilter[primaryCategory])) {
        // it is not in medium, so add it medium: {oil:2345, acrylic:555}
        updatedArtFilter[primaryCategory][subcategoryKey] = subcategoryValue;
      } else {
        // else remove the subcategory since it already exists
        delete updatedArtFilter[primaryCategory][subcategoryKey];
        if (Object.keys(updatedArtFilter[primaryCategory]).length === 0) {
          delete updatedArtFilter[primaryCategory];
        }
      }
    }
    dispatch({
      type: "handleFilterObjectUpdate/artworks",
      payload: updatedArtFilter,
    });
  };

  ///////////////////////////
  // Handle Size Filter
  ///////////////////////////
  const handleSizeFilter = (name, value) => {
    // namne = size
    // value = select value (12,24,50,100)
    dispatch({ type: "updateSizeFilter/artworks", payload: { name, value } });
  };

  // if the search query active then filter the results based on the current query
  // otherwise base results of all available artworks, then apply filters
  useEffect(() => {
    if (searchQuery.length > 3) {
      handleSearchArtworksByTitle(searchQuery, artFilter);
    } else {
      handleGetAllArtworks();
    }
  }, [artFilter]);

  ///////////////////////////
  // Get initial Filter Values from api
  ///////////////////////////
  const handleGetAllFilterObjs = async () => {
    dispatch({ type: "filtersStartLoading/artworks" });
    try {
      // Fetches and processes culture objects
      await handleGetCultureObjs();
      // Fetches and processes classification objects
      await handleGetClassificationObjs();
      // Fetches and processes work type objects
      await handleGetWorktypeObjs();
      // Fetches and processes medium objects
      await handleGetMediumObjs();
      // Fetches and processes century objects
      await handleGetCenturyObjs();
      // Fetches and processes technique objects
      await handleGetTechniqueObjs();
      // Fetches and processes period objects
      await handleGetPeriodObjs();
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch all filters from harvard api`);
    } finally {
      dispatch({ type: "filtersStopLoading/artworks" });
    }
  };

  useEffect(() => {
    handleGetAllFilterObjs();
  }, []);

  // all categories combined to one array
  const primaryCategories = [
    century,
    classification,
    culture,
    medium,
    period,
    technique,
    worktype,
  ];
  ///////////////////////////
  // Show Artwork List Details
  ///////////////////////////
  const fetchArtworkListInfo = () => {
    const idAndCreationList = [
      { label: "Object ID", content: showArtwork?.id ? showArtwork.id : "N/A" },
      {
        label: "People",
        content: showArtwork?.people ? showArtwork.people : "N/A",
      },
      {
        label: "Title",
        content: showArtwork?.title ? showArtwork.title : "N/A",
      },
      {
        label: "Classification",
        content: showArtwork?.classification
          ? showArtwork.classification
          : "N/A",
      },
      {
        label: "Work Type",
        content: showArtwork?.worktype ? showArtwork.worktype : "N/A",
      },
      {
        label: "Date",
        content: showArtwork?.dated ? showArtwork.dated : "N/A",
      },
      {
        label: "Culture",
        content: showArtwork?.culture ? showArtwork.culture : "N/A",
      },
      {
        label: "Persistent Link",
        content: showArtwork?.url ? showArtwork.url : "N/A",
      },
    ];

    const physicalDescriptionList = [
      {
        label: "Medium",
        content: showArtwork?.medium ? showArtwork.medium : "N/A",
      },
      {
        label: "Dimensions",
        content: showArtwork?.dimensions ? showArtwork.dimensions : "N/A",
      },
    ];

    const provenanceList = [
      {
        label: "Recorded Ownership History",
        content: showArtwork?.provenance ? showArtwork.provenance : "N/A",
      },
    ];

    const acquisitionAndRightsList = [
      {
        label: "Credit Line",
        content: showArtwork?.creditline ? showArtwork.creditline : "N/A",
      },
      {
        label: "Copyright",
        content: showArtwork?.copyright ? showArtwork.copyright : "N/A",
      },
      {
        label: "Accession Year",
        content: showArtwork?.accessionyear ? showArtwork.accessionyear : "N/A",
      },
      {
        label: "Division",
        content: showArtwork?.division ? showArtwork.division : "N/A",
      },
      {
        label: "Contact",
        content: showArtwork?.contact ? showArtwork.contact : "N/A",
      },
    ];

    const descriptionsList = [
      {
        label: "Commentary",
        content: showArtwork?.commentary ? showArtwork.commentary : "N/A",
      },
    ];
    const allArtInfoLists = [
      {
        list: idAndCreationList,
        listTitle: "Identification and Creation",
      },
      {
        list: physicalDescriptionList,
        listTitle: "Physical Description",
      },
      {
        list: provenanceList,
        listTitle: "Provenance",
      },
      {
        list: acquisitionAndRightsList,
        listTitle: "Acquisition and Rights",
      },
      {
        list: descriptionsList,
        listTitle: "Descriptions",
      },
    ];
    console.log(allArtInfoLists, " all art info lists");
    dispatch({
      type: "setShowArtworkInfoLists/artworks",
      payload: allArtInfoLists,
    });

    return allArtInfoLists;
  };

  return (
    <ArtworkContext.Provider
      value={{
        dispatch,
        handleDisplayView,
        handleGetAllArtworks,
        handleGetNextPageOfArtworks,
        handleResetFilterState,
        handleSearchArtworksByTitle,
        handleUpdateSearchQuery,
        handleToggleCheckbox,
        handleFilterObj,
        handleShowDropdown,
        handleSizeFilter,
        handleGetAllFilterObjs,
        fetchArtworkListInfo,
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
        primaryCategories,
        records,
        searchQuery,
        showArtwork,
        showArtworkInfoLists,
        showFilterDropdown,
        technique,
        worktype,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContext;
