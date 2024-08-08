import { Link } from "react-router-dom";
import Modal from "../CommonComponents/Modal";
import { useState } from "react";

import useExbContext from "../../context/exb/useExbContext";

const ArtGalleryCard = ({
  year,
  people,
  division,
  title,
  img,
  ArtworkObjectid,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { showExb, myExbs } = useExbContext();

  ///////////////////////////
  // Modal Actions
  ///////////////////////////
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };


  return (
    <div className="shadow-md rounded-md p-4 text-gray-900 w-96 h-auto mx-auto font-cardo">
      <Link to={`/artwork/${ArtworkObjectid}`}>
        <img
          src={
            img
              ? img
              : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`
          }
          alt={title}
        />
      </Link>
      <div className="mt-6 text-2xl flex flex-col gap-4">
        <span>{year}</span>
        {people?.map((person) => (
          <span key={person.personid}>
            {person.role}: {person.name}
          </span>
        ))}
        <span className="text-gray-700 text-2xl">{title}</span>
        <span>{division}</span>
        <div className="flex justify-between items-center">
          <span
            onClick={() => alert("this will take you to the detail page")}
            className="cursor-pointer"
          >
            details
          </span>

          <>
            <button
              onClick={() => {
                showModal();
              }}
            >
              +
            </button>
            <Modal
              ArtworkObjectid={ArtworkObjectid}
              exbs={myExbs}
              isVisible={isModalVisible}
              onClose={hideModal}
            >
              <p className="mt-4 px-4 py-2 bg-black text-white">
                Add to Exhibition
              </p>
              <button
                onClick={hideModal}
                className="mt-4 px-4 py-2 bg-black text-white"
              >
                Close
              </button>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};
export default ArtGalleryCard;
