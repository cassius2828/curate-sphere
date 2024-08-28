// Import necessary React components and hooks
import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
// Import modals and context
import Modal from "../CommonComponents/Modals/Modal";
import ConfirmDeleteModal from "../CommonComponents/Modals/ConfirmDeleteModal";
import useExbContext from "../../context/exb/useExbContext";
// Import services
import { getArtworkDetail } from "../../services/artworkService";

///////////////////////////
// ExbArtworkCard Component
///////////////////////////
const ExbArtworkCard = ({ ArtworkObjectid, isUsersExb }) => {
  // Initialize hooks
  const location = useLocation();
  const { myExbs, handleGetExbArtworks } = useExbContext();
  const { id } = useParams();

  // State management
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [artworkData, setArtworkData] = useState({});

  // Destructure artwork data for easier access
  const { primaryimageurl, dated, division, people, title, objectid } =
    artworkData;

  ///////////////////////////
  // Modal Actions
  ///////////////////////////
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  ///////////////////////////
  // Fetch Artwork Details
  ///////////////////////////
  const fetchArtworkDetails = async () => {
    const data = await getArtworkDetail(ArtworkObjectid);
    setArtworkData(data);
  };

  useEffect(() => {
    fetchArtworkDetails();
  }, []); // Empty dependency array ensures this effect runs once after initial render

  return (
    <div className="shadow-md rounded-md p-4 text-gray-900 w-full h-auto font-cardo">
      {/* Link to artwork detail page */}
      <Link to={`/artwork/${objectid}`}>
        <img
          src={
            primaryimageurl
              ? primaryimageurl
              : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`
          }
          alt="Artwork"
        />
      </Link>
      <div className="mt-6 text-2xl flex flex-col gap-4">
        <span>{dated}</span>
        {/* Display people involved in artwork */}
        {people?.map((person) => (
          <span key={person.personid}>
            {person.role}: {person.name}
          </span>
        ))}
        {/* Display artwork title and division */}
        <span className="text-gray-700 text-2xl">{title}</span>
        <span>{division}</span>

        {/* Artwork details and actions */}
        <div className="flex justify-between items-center">
          <Link to={`/artworks/${objectid}`}>
            <span className="cursor-pointer">details</span>
          </Link>

          {/* Conditional rendering based on ownership of the exhibition */}
          {!isUsersExb ? (
            <>
              <button onClick={showModal}>+</button>
              <Modal
                ArtworkObjectid={ArtworkObjectid}
                exbs={myExbs}
                isVisible={isModalVisible}
                onClose={hideModal}
              />
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
