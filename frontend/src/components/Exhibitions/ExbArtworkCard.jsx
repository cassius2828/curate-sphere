import { useLocation, Link, useParams } from "react-router-dom";
import Modal from "../CommonComponents/Modal";
import { useEffect, useState } from "react";
import { getArtworkDetail } from "../../services/artworkService";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import { removeArtworkFromExb } from "../../services/exbService";

const ExbArtworkCard = ({ ArtworkObjectid,isUsersExb }) => {
  const location = useLocation();
  const { myExbs, handleGetExbArtworks } = useExbContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [artworkData, setArtworkData] = useState({});
  const { primaryimageurl, dated, division, people, title, objectid } =
    artworkData;
  const { id } = useParams();

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const fetchArtworkDetails = async () => {
    const data = await getArtworkDetail(ArtworkObjectid);
    setArtworkData(data);
  };

  const handleRemoveArtworkFromExb = async () => {
    try {
      const data = await removeArtworkFromExb(id, objectid);
      if (data.message) {
        setMessage(data.message);
      }
      if (data.error) {
        setMessage(data.error);
      }
      await handleGetExbArtworks(id)
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to remove artwork from exb`);
    } 
  };

  useEffect(() => {
    fetchArtworkDetails();
    // console.log(artworkData);
    console.log(myExbs);
  }, []);

  return (
    <div className="shadow-md rounded-md p-4 text-gray-900 w-full h-auto font-cardo">
      <Link to={`/artwork/${objectid}`}>
        {/* <img src={img ? img : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`} alt="sample image" /> */}
        <img
          src={
            primaryimageurl
              ? primaryimageurl
              : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`
          }
          alt="sample image"
        />
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
          {!isUsersExb ? (
            <>
              <button onClick={showModal}>+</button>
              <Modal exbs={myExbs} isVisible={isModalVisible} onClose={hideModal}></Modal>
            </>
          ) : (
            location.pathname === `/exhibition/${id}` && (
              <button
                className="text-red-500"
                onClick={() => handleRemoveArtworkFromExb()}
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
