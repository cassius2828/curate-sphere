import { createContext, useEffect, useReducer } from "react";
import {
  deleteExb,
  editExb,
  getAllExhibitions,
  getExbArtworks,
  getExbDetail,
  getUserExhibitions,
} from "../../services/exbService";
import useGlobalContext from "../global/useGlobalContext";
import {
  getItemIndexedDB,
  setItemIndexedDB,
} from "../../utils/indexedDB.config";

///////////////////////////
// Context Creation
///////////////////////////
const ExbContext = createContext();

///////////////////////////
// Initial State
///////////////////////////
const initialState = {
  showExb: {},
  exploreExbs: [],
  myExbs: [],
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "explore/exb":
      return { ...state, exploreExbs: action.payload };
    case "getDetail/exb":
      return { ...state, showExb: action.payload };
    case "userExbs/exb":
      return { ...state, myExbs: action.payload };
    case "sortUserExbs/exb":
      return { ...state, myExbs: action.payload };
    case "sortExploreExbs/exb":
      return { ...state, exploreExbs: action.payload };
    case "searchUserExbs/exb":
      return { ...state, myExbs: action.payload };
    case "editDetail/exb":
      return { ...state, showExb: action.payload };
    case "addArtworks/exb":
      return {
        ...state,
        showExb: {
          ...state.showExb,
          artworks: action.payload,
        },
      };
    // loading state
    case "startLoading/exb":
      return { ...state, isLoading: true };
    case "stopLoading/exb":
      return { ...state, isLoading: false };
    // reset
    case "resetAll/exb":
      return initialState;
    default:
      break;
  }
};
///////////////////////////
// Provider
///////////////////////////
export const ExbProvider = ({ children }) => {
  const [{ showExb, exploreExbs, myExbs, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { user } = useGlobalContext();

  ///////////////////////////
  //   GET | index
  ///////////////////////////
  const handleGetAllExbs = async () => {
    try {
      const data = await getAllExhibitions(user?.user.id);

      dispatch({ type: "explore/exb", payload: data });
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to get all exbs | context`);
    }
  };

  ///////////////////////////
  //   GET | user exbs
  ///////////////////////////
  const handleGetUserExbs = async () => {
    try {
      if (user) {
        const data = await getUserExhibitions(user?.user.id);
        if (!data.error) {
          dispatch({ type: "userExbs/exb", payload: data });
        }
      } else {
        dispatch({ type: "userExbs/exb", payload: [] });
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to get all exbs | context`);
    }
  };

  ///////////////////////////
  //   GET | Exb Artworks
  ///////////////////////////
  const handleGetExbArtworks = async (exbId) => {
    try {
      const data = await getExbArtworks(exbId);
      dispatch({ type: "addArtworks/exb", payload: data });
      return data;
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to communicate with db to add artworks to exb | context`
      );
    }
  };
  ///////////////////////////
  //   GET | show
  ///////////////////////////
  const handleGetExbDetail = async (exbId) => {
    // checks for cached exb first , then go through fetching from our db, making thru table, fetching images from harvard api
    const cachedExb = await getItemIndexedDB(exbId, "exhibitions");
    if (cachedExb) {
      return dispatch({ type: "getDetail/exb", payload: cachedExb });
    }
    try {
      const data = await getExbDetail(exbId);
      dispatch({ type: "getDetail/exb", payload: data });
      const exbData = await handleGetExbArtworks(exbId);
      await setItemIndexedDB(exbId, { ...data, artworks: exbData }, "exhibitions");
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to get exb detail | context`);
    }
  };

  ///////////////////////////
  //   ! DELETE
  ///////////////////////////
  const handleDeleteExb = async (id) => {
    try {
      const data = await deleteExb(id);
      const updatedUserExbs = myExbs.filter((exb) => exb.id === id);
      dispatch({ type: "userExbs/exb", payload: updatedUserExbs });
      // handleGetUserExbs();
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to delete exb | context`);
    }
  };
  ///////////////////////////
  //   * PUT | edit
  ///////////////////////////
  const handleEditExb = async (id, showExb) => {
    try {
      const data = await editExb(id, showExb);
      dispatch({ type: "editDetail/exb", payload: data });
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to edit exb | context`);
    }
  };

  ///////////////////////////
  // Sort User Exbs
  ///////////////////////////
  const handleSortExbs = (sortInput, exbs) => {
    let sortedExbs;
    if (sortInput === "a-z") {
      sortedExbs = exbs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortInput === "z-a") {
      sortedExbs = exbs.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortInput === "newest") {
      sortedExbs = exbs.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else {
      sortedExbs = exbs.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    if (exbs === myExbs) {
      dispatch({ type: "sortUserExbs/exb", payload: sortedExbs });
    } else {
      dispatch({ type: "sortExploreExbs/exb", payload: sortedExbs });
    }
  };

  ///////////////////////////
  // GET User exbs on mount
  ///////////////////////////
  useEffect(() => {
    handleGetUserExbs();
  }, [user]);

  ///////////////////////////
  // Reset Exb State
  ///////////////////////////
  const handleResetExbState = () => {
    dispatch({ type: "resetAll/exb" });
  };

  return (
    <ExbContext.Provider
      value={{
        dispatch,
        handleDeleteExb,
        handleEditExb,
        handleGetAllExbs,
        handleGetExbArtworks,
        handleGetExbDetail,
        handleGetUserExbs,
        handleResetExbState,
        handleSortExbs,
        isLoading,
        exploreExbs,
        myExbs,
        showExb,
      }}
    >
      {children}
    </ExbContext.Provider>
  );
};

export default ExbContext;
