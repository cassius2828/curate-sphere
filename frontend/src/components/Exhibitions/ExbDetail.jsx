// Import React and hooks
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// Import context hooks
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// Import components
import Masonry from "react-masonry-css";
import ExbArtworkCard from "./ExbArtworkCard";
import Loader from "../CommonComponents/Loaders/Loader";

///////////////////////////
// ExbDetail Component
///////////////////////////
const ExbDetail = () => {
  // Extracting necessary hooks and context values
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const { formatDate } = useGlobalContext();
  const {
    handleGetExbDetail,
    showExb,
    handleDeleteExb,
    handleGetUserExbs,
    dispatch,
    isLoading,
  } = useExbContext();

  ///////////////////////////
  // Masonry Grid Config
  ///////////////////////////
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  ///////////////////////////
  // Fetch Exhibition Detail
  ///////////////////////////
  useEffect(() => {
    const fetchExbDetail = async () => {
      dispatch({ type: "startLoading/exb" });
      try {
        // Fetching exhibition detail and updating the state
        await handleGetExbDetail(id);
      } catch (err) {
        console.error("Unable to get exb detail | ExbDetail", err);
      } finally {
        dispatch({ type: "stopLoading/exb" });
      }
    };

    fetchExbDetail();
  }, []);

  ///////////////////////////
  // Handle Delete Exhibition
  ///////////////////////////
  const handleDeleteButton = async () => {
    try {
      await handleDeleteExb(id);
      handleGetUserExbs();
      navigate("/exhibitions/dashboard");
    } catch (err) {
      console.error("Error deleting exhibition", err);
    }
  };

  // Determine if the exhibition belongs to the current user
  const isUsersExb = showExb.userId === user?.user.id;

  // Show loader while fetching data
  if (isLoading) return <Loader />;

  return (
    <section>
      {/* Exhibition details */}
      <div className="flex flex-col items-center text-center mx-auto mb-16 p-5 md:p-0 md:w-1/2">
        <h1 className="text-6xl mb-5 font-marcellus">{showExb.title}</h1>
        <p className="text-4xl font-cardo">Location: {showExb.location}</p>
        <p className="text-4xl mb-10 font-cardo">
          Dates: {formatDate(showExb.startDate)} - {formatDate(showExb.endDate)}
        </p>
        <p className="text-3xl font-cardo text-start">{showExb.description}</p>

        {/* Exhibition actions for the owner */}
        {isUsersExb && (
          <div className="flex gap-4 text-2xl mt-8">
            <Link to={`/exhibitions/${id}/edit`}>
              <button className="border border-black px-6 py-1 font-cardo">
                Edit exhibition details
              </button>
            </Link>
            <button
              onClick={handleDeleteButton}
              className="border border-black px-6 py-1 font-cardo"
            >
              Delete exhibition
            </button>
          </div>
        )}
      </div>

      {/* Artworks count and grid display */}
      <div className="flex flex-col items-center mx-auto">
        <p className="text-center text-2xl font-cardo">
          Contains <span className="text-red-400">{showExb?.artworks?.length}</span> artworks
        </p>
        <div className="w-3/4 mx-auto mt-8">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid gap-6"
            columnClassName="masonry-grid_column"
          >
            {showExb?.artworks?.map((record) => (
              <ExbArtworkCard
                isUsersExb={isUsersExb}
                key={record.ArtworkObjectid}
                ArtworkObjectid={record.ArtworkObjectid}
              />
            ))}
          </Masonry>
        </div>
      </div>
    </section>
  );
};

export default ExbDetail;