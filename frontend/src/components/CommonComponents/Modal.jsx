import { useState } from "react";
import { postAddArtworkToExb } from "../../services/exbService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isVisible, onClose, exbs = [], ArtworkObjectid }) => {
  const [message, setMessage] = useState("");
  const [displayUserExbs, setDisplayUserExbs] = useState(exbs);
  if (!isVisible) {
    return null;
  }
  ///////////////////////////
  // Search Functions / Actions
  ///////////////////////////
  const handleSearchQuery = (e) => {
    const { value } = e.target;
    filterdisplayUserExbsBySearch(value);
  };

  const filterdisplayUserExbsBySearch = (searchQuery) => {
    // begins search when query is at least 3 chars long
    if (searchQuery.length > 2)
      setDisplayUserExbs(
        displayUserExbs.filter((exb) =>
          exb.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    // resets results if user cleared search
    if (searchQuery.length === 0) setDisplayUserExbs(exbs);
  };

  ///////////////////////////
  // Add artwork to exb
  ///////////////////////////
  const handleAddArtworkToExb = async (exbId, objectid) => {
    try {
      const data = await postAddArtworkToExb(exbId, objectid);
      console.log(data);
      if (data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      console.log(`Cannot communicate with DB to add artwork to exb`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 modal">
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 h-96 rounded-lg shadow-lg w-3/4 md:w-1/2 max-w-[50rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          className="absolute top-0 right-3 text-4xl modal-close"
          onClick={() => {
            onClose();
            setMessage("");
          }}
        >
          &times;
        </button>{" "}
        <p className="text-center">Click Exhibition to Add Artwork</p>
        {exbs?.length < 1 && (
          <Link to={`/exhibitions/create`}>
            <p className="capitalize text-lg mt-5 border-2 px-4 py-2">
              Create your first Exhibition!
            </p>
          </Link>
        )}
        {message === "success" ? (
          <p className="text-green-500">{message}</p>
        ) : (
          <p className="text-red-500">{message}</p>
        )}
        <div className="relative flex flex-col justify-start w-3/4">
          {/* search input */}
          <input
            // value={query}
            onChange={handleSearchQuery}
            className=" border-4 border-neutral-900 p-2 mt-4 mb-6 w-full "
            type="text"
          />
          <FontAwesomeIcon
            className="absolute top-8 right-5  text-2xl "
            icon={faSearch}
          />
        </div>
        <ul className="bg-neutral-100 w-full md:w-1/2 mb-4 h-80 overflow-y-scroll ">
          {displayUserExbs?.map((exb, idx) => (
            <li
              onClick={() => handleAddArtworkToExb(exb.id, ArtworkObjectid)}
              key={idx}
              className="p-3 hover:bg-neutral-200 cursor-pointer"
            >
              {exb.title.length > 19
                ? exb.title.slice(0, 20) + "..."
                : exb.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
