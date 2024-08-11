import { useLocation, Link, useParams } from "react-router-dom";
import Modal from "../CommonComponents/Modal";
import { useEffect, useState } from "react";
import { getArtworkDetail } from "../../services/artworkService";
import useExbContext from "../../context/exb/useExbContext";
import ConfirmDeleteModal from "../CommonComponents/ConfirmDeleteModal";

const ExbArtworkCard = ({ ArtworkObjectid, isUsersExb }) => {
  const location = useLocation();
  const { myExbs, handleGetExbArtworks } = useExbContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [artworkData, setArtworkData] = useState({});
  const { primaryimageurl, dated, division, people, title, objectid } =
    artworkData;
  const { id } = useParams();
  ///////////////////////////
  // Modal Actions
  ///////////////////////////
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  ///////////////////////////
  // Fetch Artwork Details
  ///////////////////////////
  const fetchArtworkDetails = async () => {
    const data = await getArtworkDetail(ArtworkObjectid);
    setArtworkData(data);
  };

  useEffect(() => {
    fetchArtworkDetails();
  }, []);

  return (
    <div className="shadow-md rounded-md p-4 text-gray-900 w-full h-auto font-cardo">
      <Link to={`/artwork/${objectid}`}>
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
        {/* title */}
        <span className="text-gray-700 text-2xl">{title}</span>
        {/* division */}
        <span>{division}</span>
        {/* details */}
        <div className="flex justify-between items-center">
          <Link to={`artworks/${objectid}`}>
            <span className="cursor-pointer">details</span>
          </Link>
          {/* allows to delete artwork if owner of exb or add to your exb if not owner */}
          {!isUsersExb ? (
            <>
              <button onClick={showModal}>+</button>
              <Modal
                exbs={myExbs}
                isVisible={isModalVisible}
                onClose={hideModal}
              ></Modal>
            </>
          ) : (
            location.pathname === `/exhibition/${id}` && (
              <>
                <button className="text-red-500" onClick={showModal}>
                  [x]
                </button>
                <ConfirmDeleteModal
                  handleReloadResource={handleGetExbArtworks}
                  id={id}
                  objectid={objectid}
                  isVisible={isModalVisible}
                  onClose={hideModal}
                />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default ExbArtworkCard;
