// React and React Router imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Service and utility imports
import { getArtworkDetail } from "../../../services/artworkService";
import { updateUserImgsByArtworkUrl } from "../../../services/profileService";
import { getUser } from "../../../services/authService";
import {
  getItemIndexedDB,
  setItemIndexedDB,
} from "../../../utils/indexedDB.config";
// Context hooks
import useExbContext from "../../../context/exb/useExbContext";
import useArtworkContext from "../../../context/artwork/useArtworkContext";
import useGlobalContext from "../../../context/global/useGlobalContext";
// Component imports
import Modal from "../../CommonComponents/Modals/Modal";
import Loader from "../../CommonComponents/Loaders/Loader";
import LoaderRipple from "../../CommonComponents/Loaders/LoaderRipple";
import { ArtDetailActionBtn } from "./ArtDetailActionBtn";
import { ArtInfoSection } from "./ArtInfoSection";
// FontAwesome icons
import {
  faAsterisk,
  faLink,
  faMountain,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import FixedAlert from "../../CommonComponents/Modals/FixedAlert";

const initialCopyState = {
  showCopiedUrlModal: false,
  copyUrlMessage: "",
  copyError: false,
};

const ArtDetail = () => {
  // Local state declarations
  const [artListInfo, setArtListInfo] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [copyState, setCopyState] = useState(initialCopyState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Context hooks
  const { isLoading, dispatch, showArtwork, fetchArtworkListInfo } =
    useArtworkContext();
  const { user, setUser,scrollToTop } = useGlobalContext();
  const { myExbs } = useExbContext();
  const { id } = useParams();
  const navigate = useNavigate();

  // Destructuring artwork details for easier access
  const { primaryimageurl, title, classification } = showArtwork;

  ///////////////////////////
  // Modal Actions
  ///////////////////////////
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  ///////////////////////////
  // Handle Update Profile Img
  ///////////////////////////
  const handleUpdateUserImgByArtworkUrl = async (imgUrl, imgType) => {
    try {
      const data = await updateUserImgsByArtworkUrl(
        imgUrl,
        imgType,
        user.user.id
      );
      if (data.message) setMessage(data.message);
      if (data.error) setError(data.error);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(getUser());
      }
    } catch (err) {
      console.error("Could not communicate with backend to update user image");
    }
  };

  ///////////////////////////
  // Fetch Artwork Details by Id
  ///////////////////////////
  const fetchArtworkDetails = async () => {
    try {
      const cachedArtwork = await getItemIndexedDB(id, "artworks");
      if (cachedArtwork) {
        console.log(cachedArtwork, ' <-- cached artwork here')
        dispatch({ type: "getArtworkDetail/artworks", payload: cachedArtwork });
        return;
      }

      dispatch({ type: "startLoading/artworks" });
      setIsLoadingImg(true);

      const data = await getArtworkDetail(id);
      dispatch({ type: "getArtworkDetail/artworks", payload: data });
      await setItemIndexedDB(id, data, "artworks");
    } catch (err) {
      console.error(
        "Unable to communicate with DB to get artwork detail | ArtDetail.jsx"
      );
    } finally {
      dispatch({ type: "stopLoading/artworks" });
      setIsLoadingImg(false);
    }
  };

  ///////////////////////////
  // Copy URL Handler
  ///////////////////////////
  const handleCopyUrl = () => {
    setCopyState((prevState) => ({
      ...prevState,
      showCopiedUrlModal: true,
    }));

    try {
      navigator.clipboard.writeText(window.location.href);
      setCopyState((prevState) => ({
        ...prevState,
        copyUrlMessage: "Copied link!",
        copyError: false,
      }));
    } catch (err) {
      console.error("Unable to copy the current URL to clipboard");
      setCopyState((prevState) => ({
        ...prevState,
        copyUrlMessage: "Unable to copy the current URL to clipboard",
        copyError: true,
      }));
    }
  };

  // Fetch artwork details on component mount or when ID changes
  useEffect(() => {
    fetchArtworkDetails();
    scrollToTop()
  }, [id]);

  // Update artwork info when showArtwork changes
  useEffect(() => {
    const updateArtworkInfo = async () => {
      if (showArtwork) {
        const data = fetchArtworkListInfo();
        setArtListInfo(data);
      }
    };
    updateArtworkInfo();
  }, [showArtwork]);

  if (isLoading) return <Loader />;

  return (
    <section className="p-4 font-marcellus">
      {/* Header */}
      <header data-cy="artwork-detail-header" className="shadow-md pb-1 flex items-center justify-between w-full">
        <span className="text-5xl ml-5">CS/</span>
        <div className="flex flex-col justify-end items-center gap-6 mb-6">
          <h1 className="text-3xl md:text-4xl text-center">
            <span className="text-gray-500">{id}:</span> {title}
          </h1>
          <span className="text-xl font-bold text-gray-500">
            {classification}
          </span>
        </div>
        <div>
          <span
          data-cy="art-detail-back-btn"
            onClick={() => navigate(-1)}
            className="text-2xl hover:border-gray-600 border-transparent border p-2 mr-5 transition-all duration-200 cursor-pointer"
          >
            &larr; back
          </span>
        </div>
      </header>

      {/* Image Section */}
      <div data-cy="art-detail-img-section" className="flex flex-col justify-center items-center gap-10 my-20">
        {isLoadingImg ? (
          <div className="w-full md:w-1/2 md:h-full flex flex-col items-center gap-8">
            <LoaderRipple />
            <span className="capitalize">image is loading...</span>
          </div>
        ) : (
          <img
            className="w-full md:w-1/2 md:h-full object-cover"
            src={
              primaryimageurl
                ? primaryimageurl
                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            alt={title}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="md:w-1/2 max-w-96 mx-auto">
        <ul data-cy="art-detail-action-btns-ul" className="flex items-center justify-around gap-3">
          <ArtDetailActionBtn
            handleAction={showModal}
            icon={faPlus}
            tooltipText="Add to an Exhibition"
          />
          {user && (
            <>
              <ArtDetailActionBtn
                handleAction={() =>
                  handleUpdateUserImgByArtworkUrl(primaryimageurl, "profile")
                }
                icon={faUser}
                tooltipText="Make Profile Picture"
              />
              <ArtDetailActionBtn
                handleAction={() =>
                  handleUpdateUserImgByArtworkUrl(primaryimageurl, "header")
                }
                icon={faMountain}
                tooltipText="Make Header Picture"
              />
            </>
          )}
          <ArtDetailActionBtn
            handleAction={handleCopyUrl}
            icon={faLink}
            tooltipText="Copy Url"
          />
          <ArtDetailActionBtn
            icon={faAsterisk}
            tooltipText={
              showArtwork.creditline ||
              showArtwork.description ||
              showArtwork.commentary ||
              "N/A"
            }
          />
        </ul>
      </div>

      {/* Artwork Info Sections */}
      {artListInfo.map((section, idx) => (
        <ArtInfoSection
          key={idx}
          title={section.listTitle}
          list={section.list}
        />
      ))}

      {/* Modals */}
      {isModalVisible && (
        <Modal
          ArtworkObjectid={showArtwork.objectid}
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
      )}

      {copyState.showCopiedUrlModal && (
        <FixedAlert
          onClose={() =>
            setCopyState((prevState) => ({
              ...prevState,
              showCopiedUrlModal: false,
            }))
          }
          message={copyState.copyUrlMessage}
          success={!copyState.copyError}
        />
      )}
      {(message || error) && (
        <FixedAlert
          onClose={() => {
            setMessage("");
            setError("");
          }}
          message={message || error}
          success={!error}
        />
      )}
    </section>
  );
};

export default ArtDetail;
