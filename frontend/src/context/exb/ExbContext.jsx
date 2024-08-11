import { createContext, useReducer } from "react";
import {
  deleteExb,
  editExb,
  getAllExhibitions,
  getExbArtworks,
  getExbDetail,
  getUserExhibitions,
} from "../../services/exbService";
import useGlobalContext from "../global/useGlobalContext";

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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "explore/exb":
      return { ...state, exploreExbs: action.payload };
    case "getDetail/exb":
      return { ...state, showExb: action.payload };
    case "userExbs/exb":
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
  const [{ showExb, exploreExbs, myExbs }, dispatch] = useReducer(
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
      const data = await getUserExhibitions(user?.user.id);
      dispatch({ type: "userExbs/exb", payload: data });
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
    try {
      const data = await getExbDetail(exbId);
      dispatch({ type: "getDetail/exb", payload: data });
      const artworkData = await handleGetExbArtworks(exbId);
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

  const handleResetExbState = () => {
    dispatch({ type: "resetAll/exb" });
  };
  // showing our exb | set exhibitions | set exhibition detail | create, delete, edit

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
