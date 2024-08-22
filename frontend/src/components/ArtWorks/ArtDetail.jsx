import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtworkDetail } from "../../services/artworkService";
import Modal from "../CommonComponents/Modal";
import useExbContext from "../../context/exb/useExbContext";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import Loader from "../CommonComponents/Loader";
import LoaderRipple from "../CommonComponents/LoaderRipple";

const ArtDetail = () => {
  const [artDetails, setArtDetails] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const { isLoading, dispatch } = useArtworkContext();
  const [isLoadingImg, setIsLoadingImg] = useState(false);

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
  // Fetch Artwork Details by Id
  ///////////////////////////
  const fetchArtworkDetails = async () => {
    dispatch({ type: "startLoading/artworks" });
    setIsLoadingImg(true);
    try {
      const data = await getArtworkDetail(id);
      setArtDetails(data);
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
  }, []);

  if (isLoading) return <Loader />;
  return (
    <section className="p-4">
      {/* title */}
      <h1 className="text-5xl md:text-6xl mb-12 md:mb-24 text-center font-marcellus">
        {title}
      </h1>
      {/* img */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-20">
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
        <div className="flex flex-col justify-center mx-10 items-start gap-6 md:gap-20 md:items-start md:mx-2 text-3xl font-cardo">
          {/* artists */}
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
          <div className="flex items-center justify-center w-full md:w-3/4 mx-auto gap-12">
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
