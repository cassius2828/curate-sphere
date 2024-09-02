// Import React and Hooks
import { useState } from "react";
// Import Router components
import { Link } from "react-router-dom";
// Import FontAwesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// Import Services
import { postAddArtworkToExb } from "../../../services/exbService";
// Import Context
import useGlobalContext from "../../../context/global/useGlobalContext";
// Import Components
import PromptSignIn from "./PromptSignIn";
import useExbContext from "../../../context/exb/useExbContext";

///////////////////////////
// Modal Component
///////////////////////////
const Modal = ({ isVisible, onClose, exbs = [], ArtworkObjectid }) => {
  // State to manage messages and filtered exhibitions
  const [message, setMessage] = useState("");
  const [displayUserExbs, setDisplayUserExbs] = useState(exbs);
  const { user } = useGlobalContext();
  const {myExbs} = useExbContext()
console.log(myExbs, ' <-- myexbhs')
  ///////////////////////////
  // Search Functions / Actions
  ///////////////////////////
  const handleSearchQuery = (e) => {
    const { value } = e.target;
    filterdisplayUserExbsBySearch(value);
  };

  const filterdisplayUserExbsBySearch = (searchQuery) => {
    // Begin search when query is at least 3 characters long
    if (searchQuery.length > 2) {
      setDisplayUserExbs(
        displayUserExbs.filter((exb) =>
          exb.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (searchQuery.length === 0) {
      // Reset results if user clears search
      setDisplayUserExbs(exbs);
    }
  };

  ///////////////////////////
  // Add artwork to exhibition
  ///////////////////////////
  const handleAddArtworkToExb = async (exbId, objectid) => {
    try {
      const data = await postAddArtworkToExb(exbId, objectid);
      if (data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      console.error("Cannot communicate with DB to add artwork to exhibition");
    }
  };

  // Return null if modal is not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div data-cy="default-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 modal">
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 h-96 rounded-lg shadow-lg w-3/4 md:w-1/2 max-w-[50rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Conditional rendering based on user authentication */}
        {!user ? (
          <>
            <PromptSignIn text={"add artwork"} mt0 />
            <button
              className="absolute top-0 right-3 text-4xl modal-close"
              onClick={() => {
                onClose();
                setMessage("");
              }}
            >
              &times;
            </button>
          </>
        ) : (
          <>
            <button
            data-cy="default-modal-close"
              className="absolute top-0 right-3 text-4xl modal-close"
              onClick={() => {
                onClose();
                setMessage("");
              }}
            >
              &times;
            </button>
            <p className="text-center">Click Exhibition to Add Artwork</p>
            {/* Link to create a new exhibition if none exist */}
            {myExbs?.length < 1  && (
              <Link to={`/exhibitions/create`}>
                <p data-cy="modal-create-first-exb-prompt-btn" className="capitalize text-lg mt-5 border-2 px-4 py-2">
                  Create your first Exhibition!
                </p>
              </Link>
            )}
            {/* Display success or error message */}
            {message === "success" ? (
              <p data-cy="success-message" className="text-green-500">{message}</p>
            ) : (
              <p data-cy="error-message" className="text-red-500">{message}</p>
            )}
            {/* Search input and results */}
            {exbs?.length > 0 && (
              <>
                {" "}
                <div className="relative flex flex-col justify-start w-3/4">
                  <input
                  data-cy="exb-search"
                    onChange={handleSearchQuery}
                    className=" border-4 border-neutral-900 p-2 mt-4 mb-6 w-full"
                    type="text"
                  />
                  <FontAwesomeIcon
                    className="absolute top-8 right-5 text-2xl"
                    icon={faSearch}
                  />
                </div>
                <ul data-cy="exb-list" className="bg-neutral-100 w-full md:w-1/2 mb-4 h-80 overflow-y-scroll">
                  {displayUserExbs?.map((exb, idx) => (
                    <li
                      onClick={() =>
                        handleAddArtworkToExb(exb.id, ArtworkObjectid)
                      }
                      key={idx}
                      className="p-3 hover:bg-neutral-200 cursor-pointer"
                    >
                      {exb.title.length > 19
                        ? exb.title.slice(0, 20) + "..."
                        : exb.title}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
