import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArtworkDetail } from "../../services/artworkService";
import Modal from "../CommonComponents/Modal";
import useExbContext from "../../context/exb/useExbContext";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import Loader from "../CommonComponents/Loader";
import LoaderRipple from "../CommonComponents/LoaderRipple";
import {
  getItemIndexedDB,
  setItemIndexedDB,
} from "../../utils/indexedDB.config";
import { updateUserImgsByArtworkUrl } from "../../services/profileService";
import useGlobalContext from "../../context/global/useGlobalContext";
import { getUser } from "../../services/authService";

const ArtDetail = () => {
  const [artListInfo, setArtListInfo] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [message, setMessage] = useState("");
  const { isLoading, dispatch, showArtwork, fetchArtworkListInfo } =
    useArtworkContext();
  const { user, setUser } = useGlobalContext();
  const { myExbs } = useExbContext();
  const { id } = useParams();
  const navigate = useNavigate();

  //  art details contents destructuring
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
      const cachedArtwork = await getItemIndexedDB(id, "artwork");
      if (cachedArtwork) {
        dispatch({ type: "getArtworkDetail/artworks", payload: cachedArtwork });
        return;
      }

      dispatch({ type: "startLoading/artworks" });
      setIsLoadingImg(true);

      const data = await getArtworkDetail(id);
      dispatch({ type: "getArtworkDetail/artworks", payload: data });
      await setItemIndexedDB(id, data, "artwork");
    } catch (err) {
      console.error(
        "Unable to communicate with DB to get artwork detail | ArtDetail.jsx"
      );
    } finally {
      dispatch({ type: "stopLoading/artworks" });
      setIsLoadingImg(false);
    }
  };

  useEffect(() => {
    fetchArtworkDetails();
  }, [id]);

  useEffect(() => {
    const updateArtworkInfo = async () => {
      if (showArtwork) {
        const data = fetchArtworkListInfo();
        setArtListInfo(data);
      }
    };
    updateArtworkInfo();
  }, [showArtwork]); // Update artwork info when showArtwork changes

  if (isLoading) return <Loader />;

  return (
    <section className="p-4 font-marcellus">
      {/* header */}
      <header className="shadow-md pb-1 flex items-center justify-between w-full">
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
            onClick={() => navigate(-1)}
            className="text-2xl hover:border-gray-600 border-transparent border p-2 mr-5 transition-all duration-200 cursor-pointer"
          >
            &larr; back
          </span>
        </div>
      </header>
      {/* img */}
      <div className="flex flex-col justify-center items-center gap-10 my-20">
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
      {/* buttons and details */}
      <div className="w-1/2 max-w-96 mx-auto">
        <ul className="flex items-center justify-around gap-3">
          {/* Placeholder for buttons */}
          <li className="p-3 border border-gray-500">X</li>
          <li className="p-3 border border-gray-500">X</li>
          <li className="p-3 border border-gray-500">X</li>
          <li className="p-3 border border-gray-500">X</li>
          <li className="p-3 border border-gray-500">X</li>
        </ul>
      </div>
      {artListInfo.map((section, idx) => (
        <ArtInfoSection
          key={idx}
          title={section.listTitle}
          list={section.list}
        />
      ))}
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
      {/* action buttons */}
      <div className="flex flex-col items-center justify-center w-full md:w-3/4 mx-auto gap-12">
        {user && (
          <div className="gap-12 w-full flex items-center">
            <button
              onClick={() =>
                handleUpdateUserImgByArtworkUrl(primaryimageurl, "profile")
              }
              className="border border-black px-6 py-1 font-cardo md:w-1/2 mt-6 md:mt-auto mx-auto"
            >
              Make Profile Picture
            </button>
            <button
              onClick={() =>
                handleUpdateUserImgByArtworkUrl(primaryimageurl, "header")
              }
              className="border border-black px-6 py-1 font-cardo md:w-1/2 mt-6 md:mt-auto mx-auto"
            >
              Make Profile Header
            </button>
          </div>
        )}
        <div className="gap-12 w-full flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="border border-black px-6 py-1 font-cardo md:w-1/2 mt-6 md:mt-auto mx-auto"
          >
            Back
          </button>
          <button
            onClick={showModal}
            className="border border-black px-6 py-1 font-cardo md:w-1/2 mt-6 md:mt-auto mx-auto"
          >
            Add to Exhibition
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtDetail;

export const ArtInfoSection = ({ title, list }) => {
  return (
    <>
      <div className="flex flex-col justify-center pl-5 mt-12 items-start gap-6 md:gap-20 md:items-start md:mx-2 text-3xl font-cardo border-t-2">
        <h2 className="mt-5 mb-8">{title}</h2>
      </div>
      <ul className="pl-6">
        {list.map((item, idx) => (
          <ArtInfoItem
            key={item?.title || idx}
            label={item.label}
            content={item.content}
          />
        ))}
      </ul>
    </>
  );
};

export const ArtInfoItem = ({ content, label }) => {
  return (
    <div>
      <h3 className="text-gray-500 text-2xl font-semibold mb-3">{label}</h3>
      <span className="text-2xl">{content}</span>
    </div>
  );
};

/*

  
    <div className="flex flex-col justify-center mx-10 mt-12 items-start gap-6 md:gap-20 md:items-start md:mx-2 text-3xl font-cardo border-t-2">
    {message && (
      <span className="text-green-500 text-3xl mx-auto">{message}</span>
    )}{" "}
  
    <ul>
      {people?.map((person) => (
        <li className=" my-4" key={person.personid}>
          {person.role}: {person.name}
        </li>
      ))}
    </ul>

    <p>Date: {dated ? dated : "N/A"}</p>
    <p>Medium: {medium ? medium : "N/A"}</p>
    <p>Dimensions: {dimensions ? dimensions : "N/A"}</p>
    <p>Division: {division ? division : "N/A"}</p>
  
  </div>
*/
