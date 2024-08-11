import { useState } from "react";
import { postAddArtworkToExb } from "../../services/exbService";

const Modal = ({ isVisible, onClose, exbs, ArtworkObjectid }) => {
  const [message, setMessage] = useState("");

  if (!isVisible) {
    return null;
  }

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
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 h-96 rounded-lg shadow-lg w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
        {message === "success" ? (
          <p className="text-green-500">{message}</p>
        ) : (
          <p className="text-red-500">{message}</p>
        )}
        <ul className="bg-neutral-100 w-full md:w-1/2 mb-4 h-80 overflow-y-scroll ">
          {exbs?.map((exb, idx) => (
            <li
              onClick={() => handleAddArtworkToExb(exb.id, ArtworkObjectid)}
              key={idx}
              className="p-3 hover:bg-neutral-200 cursor-pointer"
            >
              {exb.title.slice(0, 20) + "..."}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
