import { useLocation, Link } from "react-router-dom";
import Modal from "../CommonComponents/Modal";
import { useEffect, useState } from "react";
import { getArtworkDetail } from "../../services/artworkService";
import useExbContext from "../../context/exb/useExbContext";

const ArtGalleryCard = ({ year, people, division, title, img,ArtworkObjectid }) => {
  const location = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [artworkData, setArtworkData] = useState({})
  const {showExb, myExbs} = useExbContext()

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };


  // console.log(artworkData, ' hello')

  return (
    <div className="shadow-md rounded-md p-4 text-gray-900 w-96 h-auto font-cardo">
      <Link to={`/artwork/${ArtworkObjectid}`}>
        {/* <img src={img ? img : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`} alt="sample image" /> */}
        <img src={img ? img : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`} alt="sample image" />
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
                        <button onClick={() => {showModal()}}>
              +
            </button>
            <Modal ArtworkObjectid={ArtworkObjectid} exbs={myExbs} isVisible={isModalVisible} onClose={hideModal} >
              <p className="mt-4 px-4 py-2 bg-black text-white">Add to Exhibition</p>
              <button onClick={hideModal} className="mt-4 px-4 py-2 bg-black text-white">
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

// const ArtGalleryCard = () => {
//   return (
//     <div className="shadow-md rounded-md p-4 text-gray-900">
//       <img
//         width="275"
//         src="https://nrs.hvrd.art/urn-3:HUAM:62187_dynmc?width=3000&height=3000"
//         alt="sample image"
//       />
//       <div className="mt-6 text-2xl flex flex-col gap-4">
//         <span>year</span>
//         <span>artist</span>
//         <span className="text-gray-700 text-3xl">title</span>
//         <span>style</span>
//         <div className="flex justify-between items-center">
//           <span
//             onClick={() => alert("this will take you to the detail page")}
//             className="cursor-pointer"
//           >
//             details
//           </span>
//           <button
//             onClick={() =>
//               alert(
//                 "This will allow a user to add an artpiece to their exhibition. It will bring up a modal or page to choose an exhibition to add it to"
//               )
//             }
//           >
//             +
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ArtGalleryCard;
