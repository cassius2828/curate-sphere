import { useLocation, Link } from "react-router-dom";
import Modal from "../CommonComponents/Modal";
import { useEffect, useState } from "react";
import { getArtworkDetail } from "../../services/artworkService";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";

const ExbArtworkCard = ({ ArtworkObjectid }) => {
  const location = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [artworkData, setArtworkData] = useState({})
const {primaryimageurl, dated, division, people, title} = artworkData


  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
const fetchArtworkDetails = async () => {
     const data = await getArtworkDetail(ArtworkObjectid)
     setArtworkData(data)
}
  useEffect(() => {
fetchArtworkDetails()
console.log(artworkData)
  },[])



  return (
    <div className="shadow-md rounded-md p-4 text-gray-900 w-96 h-auto font-cardo">
      <Link to="/artwork/detail">
        {/* <img src={img ? img : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`} alt="sample image" /> */}
        <img src={primaryimageurl ? primaryimageurl : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`} alt="sample image" />
      </Link>
      <div className="mt-6 text-2xl flex flex-col gap-4">
        <span>{dated}</span>
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
          {location.pathname === "/artworks/search" ? (
            <>
                        <button onClick={showModal}>
              +
            </button>
            <Modal isVisible={isModalVisible} onClose={hideModal} >
              <p className="mt-4 px-4 py-2 bg-black text-white">Add to Exhibition</p>
              <button onClick={hideModal} className="mt-4 px-4 py-2 bg-black text-white">
                Close 
              </button>
            </Modal>
            </>

          ) : (
            location.pathname === "/exhibition/detail" && (
              <button
                className="text-red-500"
                onClick={() =>
                  alert("This will remove the art piece from the exhibition.")
                }
              >
                [x]
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default ExbArtworkCard;