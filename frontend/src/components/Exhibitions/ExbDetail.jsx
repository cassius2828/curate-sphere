import { useEffect } from "react";
import useExbContext from "../../context/exb/useExbContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Masonry from "react-masonry-css";

import ExbArtworkCard from "./ExbArtworkCard";
import Loader from "../CommonComponents/Loader";

const ExbDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handleGetExbDetail,
    showExb,
    handleDeleteExb,
    handleGetUserExbs,
    dispatch,
    isLoading,
  } = useExbContext();
  const { user } = useGlobalContext();
  const { formatDate } = useGlobalContext();
  ///////////////////////////
  // Masony Grid Data
  ///////////////////////////

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  ///////////////////////////
  // Get Detail Data
  ///////////////////////////
  useEffect(() => {
    const getDetailData = async () => {
      await handleGetExbDetail(id);
    };
    getDetailData();
  }, []);

  ///////////////////////////
  // Fext Exb detail | test
  ///////////////////////////
  useEffect(() => {
    const fetchExbDetail = async () => {
      dispatch({ type: "startLoading/exb" });
      try {
        await handleGetExbDetail(id);
      } catch (err) {
        console.error(err);
        console.log("Unable to get exb detail | ExbDetail");
      } finally {
        dispatch({ type: "stopLoading/exb" });
      }
    };

    fetchExbDetail();
  }, []);
  // conditional to tell who is owner of exb
  const isUsersExb = showExb.userId === user?.user.id;

  if (isLoading) return <Loader />;
  ///////////////////////////
  // ! Delete Btn
  ///////////////////////////
  const handleDeleteButton = async (e) => {
    try {
      await handleDeleteExb(id);
      handleGetUserExbs();
      navigate("/exhibitions/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center text-center mx-auto mb-16 p-5 md:p-0 md:w-1/2">
          {/* title */}
          <h1 className="text-6xl mb-5 font-marcellus">{showExb.title}</h1>
          {/* location */}
          <p className="text-4xl font-cardo">Location: {showExb.location}</p>
          {/* dates */}
          <p className="text-4xl mb-10 font-cardo">
            Dates: {formatDate(showExb.startDate)} -{" "}
            {formatDate(showExb.endDate)}
          </p>
          {/* description */}
          <p className="text-3xl font-cardo text-start">
            {showExb.description}
          </p>
          {/* exb actions */}
          {isUsersExb && (
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
          )}
        </div>
        {/* artwork nums */}
        <div className="flex flex-col items-center mx-auto">
          <p className=" text-center text-2xl font-cardo">
            Contains{" "}
            <span className="text-red-400">{showExb?.artworks?.length} </span>
            artworks
          </p>
          <div className="w-3/4 mx-auto mt-8">
            {/* grid of artworks */}
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid gap-6"
              columnClassName="masonry-grid_column"
            >
              {showExb?.artworks?.map((record) => {
                return (
                  <ExbArtworkCard
                    isUsersExb={isUsersExb}
                    key={record.ArtworkObjectid}
                    ArtworkObjectid={record.ArtworkObjectid}
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
