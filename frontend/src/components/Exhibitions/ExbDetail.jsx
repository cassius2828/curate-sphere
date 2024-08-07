import { useEffect, useState } from "react";
import ArtGallery from "../ArtWorks/ArtGallery";
import { FilterActionBtns } from "../ArtWorks/ArtSearch";
import useExbContext from "../../context/exb/useExbContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Masonry from "react-masonry-css";
import ArtGalleryCard from "../ArtWorks/ArtGalleryCard";
// const initialFormData = {
//   title: "",
//   location: "",
//   description: "",
//   startDate: "",
//   endDate: "",
// };
const ExbDetail = () => {
  // const [formData, setFormData] = useState(initialFormData);
  const { id } = useParams();
  // console.log(id)
  const navigate = useNavigate();
  const { handleGetExbDetail, showExb, handleDeleteExb, handleGetUserExbs } =
    useExbContext();
  const { formatDate } = useGlobalContext();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    const getDetailData = async () => {
      const data = await handleGetExbDetail(id);
      // setFormData(data);
    };
    getDetailData();
  }, []);

  useEffect(() => {
    handleGetExbDetail(id);
  }, []);

  useEffect(() => {
    console.log(showExb, " <-- showExb");
  }, [showExb]);

  const handleDeleteButton = async (e) => {
    try {
      const data = await handleDeleteExb(id);
      handleGetUserExbs();
      navigate("/exhibitions/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center mx-auto mb-16 w-1/2">
          <h1 className="text-6xl mb-5 font-marcellus">{showExb.title}</h1>
          <p className="text-4xl font-cardo">Location: {showExb.location}</p>
          <p className="text-4xl mb-10 font-cardo">
            Dates: {formatDate(showExb.startDate)} -{" "}
            {formatDate(showExb.endDate)}
          </p>
          <p className="text-3xl font-cardo">{showExb.description}</p>
          <div className="flex gap-4 text-2xl mt-8">
            <Link to={`/exhibitions/${id}/edit`}>
              <button className="border border-black px-6 py-1 font-cardo">
                Edit exhibition details
              </button>
            </Link>
            <button
              onClick={() => handleDeleteButton()}
              className="border border-black px-6 py-1 font-cardo"
            >
              Delete exhibition
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mx-auto">
          <FilterActionBtns />
          <div className="w-3/4 mx-auto mt-8">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {showExb.artworks?.map((record) => {
                return (
                  <ArtGalleryCard
                    objectid={record.objectid}
                    img={record.primaryimageurl}
                    division={record.division}
                    title={record.title}
                    year={record.dated}
                    details={record.description}
                    key={record.id}
                    people={record.people}
                  />
                );
              })}
            </Masonry>
          </div>
        </div>
      </section>
    </>
  );
};
export default ExbDetail;
