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
  const [artDetails, setArtDetails] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const { isLoading, dispatch, getArtworkFromCache, addArtworkToCache } =
    useArtworkContext();
  const { user, setUser } = useGlobalContext();
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [message, setMessage] = useState("");
  const { myExbs } = useExbContext();
  const { id } = useParams();
  const navigate = useNavigate();

  //  art details contents
  const {
    primaryimageurl,
    dated,
    division,
    people,
    title,
    medium,
    dimensions,
    classification,
  } = artDetails;
  ///////////////////////////
  // Modal Actions
  ///////////////////////////
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

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
      // display message
      if (data.message) {
        setMessage(data.message);
      }
      // set token to the refreshed token
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(getUser());
        console.log(user);
      }
    } catch (err) {
      console.error(err);
      console.log(`Could not communicate with backend to update user image`);
    }
  };
  ///////////////////////////
  // Fetch Artwork Details by Id
  ///////////////////////////
  const fetchArtworkDetails = async () => {
    const cachedArtwork = await getItemIndexedDB(id, "artwork");
    if (cachedArtwork) {
      return setArtDetails(cachedArtwork);
    }
    dispatch({ type: "startLoading/artworks" });
    setIsLoadingImg(true);
    try {
      const data = await getArtworkDetail(id);

      setArtDetails(data);
      // cache artwork
      await setItemIndexedDB(id, data, "artwork");
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to communicate with DB to aget artwork detail | ArtDetail.jsx`
      );
    } finally {
      dispatch({ type: "stopLoading/artworks" });
      setIsLoadingImg(false);
    }
  };
  useEffect(() => {
    fetchArtworkDetails();
    console.log(artDetails);
  }, []);

  if (isLoading) return <Loader />;
  return (
    <section className="p-4">
      {/* header */}
      <header className="shadow-md pb-1 flex items-center justify-between w-full">
        <span className="text-5xl font-marcellus ml-5">CS/</span>
        <div className="flex flex-col justify-end items-center gap-6 mb-6">
          <h1 className="text-3xl md:text-4xl  text-center font-marcellus">
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
      <div className="flex flex-col  justify-center items-center gap-10 my-20">
        {isLoadingImg ? (
          <div className="w-full md:w-1/2 md:h-full flex flex-col items-center gap-8">
            <LoaderRipple />
            <span className="capitalize"> image is loading...</span>
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

        {/* 
       
     
       */}
        <div></div>
      </div>
      {/* btns */}
      <div className="w-1/2 max-w-96  mx-auto  ">
        <ul className="flex items-center justify-around gap-3 ">
          {/* add to exb */}
          <li className="p-3 border border-gray-500">X</li>
          {/* make profile pic */}
          <li className="p-3 border border-gray-500">X</li>
          {/* make header */}
          <li className="p-3 border border-gray-500">X</li>
          {/* copy url */}
          <li className="p-3 border border-gray-500">X</li>
          {/* citation */}
          <li className="p-3 border border-gray-500">X</li>
        </ul>
      </div>
      {/* details */}
      <div className="flex flex-col justify-center mx-10 mt-12 items-start gap-6 md:gap-20 md:items-start md:mx-2 text-3xl font-cardo border-t-2">
        {/* artists */}
        {message && (
          <span className="text-green-500 text-3xl mx-auto">{message}</span>
        )}
        <ul>
          {people?.map((person) => (
            <li className=" my-4" key={person.personid}>
              {person.role}: {person.name}
            </li>
          ))}
        </ul>
        {/* other info */}
        <p>Date: {dated ? dated : "N/A"}</p>
        <p>Medium: {medium ? medium : "N/A"}</p>
        <p>Dimensions: {dimensions ? dimensions : "N/A"}</p>
        <p>Division: {division ? division : "N/A"}</p>

        {/* action btn */}
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
      </div>
      {isModalVisible && (
        <Modal
          ArtworkObjectid={artDetails.objectid}
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
    </section>
  );
};
export default ArtDetail;
