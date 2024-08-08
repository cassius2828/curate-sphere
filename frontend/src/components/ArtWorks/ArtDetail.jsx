import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtworkDetail } from "../../services/artworkService";
import Modal from "../CommonComponents/Modal";
import useExbContext from "../../context/exb/useExbContext";

const ArtDetail = () => {
  const [artDetails, setArtDetails] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const { myExbs } = useExbContext();
 const { id } = useParams();

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
    try {
      const data = await getArtworkDetail(id);
      setArtDetails(data);
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to communicate with DB to aget artwork detail | ArtDetail.jsx`
      );
    }
  };
  useEffect(() => {
    fetchArtworkDetails();
  }, []);

  return (
    <section className="p-4">
      {/* title */}
      <h1 className="text-5xl md:text-6xl mb-12 md:mb-24 text-center font-marcellus">
        {title}
      </h1>
      {/* img */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-20">
        <img width="375" src={primaryimageurl} alt="sample image" />
        <div className="flex flex-col justify-center mx-10 items-center gap-6 md:gap-20 md:items-start md:mx-2 text-3xl font-cardo">
        {/* artists */}
         <ul>
            {people?.map((person) => (
              <li className=" my-4" key={person.personid}>
                {person.role}: {person.name}
              </li>
            ))}
          </ul>
          {/* other info */}
          <p>Date: {dated}</p>
          <p>Medium: {medium}</p>
          <p>Dimensions: {dimensions}</p>
          <p>Division: {division}</p>
          
          {/* action btn */}
          <button
            onClick={showModal}
            className="border border-black px-6 py-1 font-cardo w-1/2"
          >
            Add to Exhibition
          </button>
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
