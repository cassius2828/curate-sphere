import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtworkDetail } from "../../services/artworkService";

const ArtDetail = () => {
  const [artDetails, setArtDetails] = useState({});
  const { id } = useParams();
  const {
    primaryimageurl,
    dated,
    division,
    people,
    title,
    medium,
    dimensions,
  } = artDetails;

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
      <h1 className="text-5xl md:text-6xl mb-12 md:mb-24 text-center font-marcellus">
        {title}
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-20">
        <img width="375" src={primaryimageurl} alt="sample image" />
        <div className="flex flex-col justify-center mx-10 items-center gap-6 md:gap-20 md:items-start md:mx-2 text-3xl font-cardo">
          <ul>
            {people?.map((person) => (
              <li className=" my-4" key={person.personid}>
                {person.role}: {person.name}
              </li>
            ))}
          </ul>
          <p>Date: {dated}</p>
          <p>Medium: {medium}</p>
          <p>Dimensions: {dimensions}</p>
          <p>Division: {division}</p>
          <button className="border border-black px-6 py-1 font-cardo w-1/2">
            Add to Exhibition
          </button>
        </div>
      </div>
    </section>
  );
};
export default ArtDetail;
