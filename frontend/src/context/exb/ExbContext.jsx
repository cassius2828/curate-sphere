import { createContext, useEffect, useReducer, useState } from "react";
import {
  createExb,
  deleteExb,
  editExb,
  getAllExhibitions,
  getExbDetail,
  getUserExhibitions,
} from "../../services/exbService";
import useGlobalContext from "../global/useGlobalContext";

// Create a Context
const ExbContext = createContext();

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

    default:
      break;
  }
};
// Create a Provider component
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
      const data = await getAllExhibitions(user.user.id);

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
      const data = await getUserExhibitions(user.user.id);
console.log(data, ' <-- users exbs')
      dispatch({ type: "userExbs/exb", payload: data });
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to get all exbs | context`);
    }
  };

  ///////////////////////////
  //   GET | show
  ///////////////////////////
  const handleGetExbDetail = async (exbId) => {
    try {
      const data = await getExbDetail(exbId);

      dispatch({ type: "getDetail/exb", payload: data });
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to get exb detail | context`);
    }
  };

  // useEffect(() => {
  //   console.log(showExb);
  // }, [showExb]);
  ///////////////////////////
  //   ! DELETE
  ///////////////////////////
  const handleDeleteExb = async (id) => {
    try {
      const data = await deleteExb(id);
      console.log(data);
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
  //   ? POST | create
  ///////////////////////////
  const handleCreateExb = async () => {
    await createExb();
  };
  // showing our exb | set exhibitions | set exhibition detail | create, delete, edit


  useEffect(() => {
    handleGetUserExbs()
    handleGetAllExbs()
  },[])
  return (
    <ExbContext.Provider
      value={{
        dispatch,
        handleEditExb,
        showExb,
        exploreExbs,
        myExbs,
        handleGetAllExbs,
        handleGetExbDetail,
        handleDeleteExb,handleGetUserExbs
      }}
    >
      {children}
    </ExbContext.Provider>
  );
};

export default ExbContext;
