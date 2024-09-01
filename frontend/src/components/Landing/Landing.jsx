// React Router
import { Link } from "react-router-dom";
// React Hooks
import { useEffect } from "react"
// Custom Hooks and Contexts
import useArtworkContext from "../../context/artwork/useArtworkContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// UI Components
import { LampContainer } from "../ui/lamp";

const Landing = () => {
  const { setIsLoading } = useGlobalContext();
  const { handleGetAllArtworks, handleGetAllFilterObjs, records } =
    useArtworkContext();

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // artworks
      if (records.length === 0) {
        await handleGetAllArtworks();
        await handleGetAllFilterObjs();
        console.log("fetched filters and artworks");
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch all data | artworks, filter objs`);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////
  // useEffect to run all fetches
  ///////////////////////////
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <LampContainer>
      <div className="relative z-50 min-h-screen flex flex-col items-center justify-center text-center gap-y-8 px-5">
        <h1 data-cy="landing-title" className="text-white text-8xl font-marcellus">Curate Sphere</h1>
        <h3 data-cy="landing-description" className="text-white text-3xl font-marcellus">
          A place to create, explore, and showcase art exhibitions
        </h3>
        <div>
          <Link to={"/exhibitions/explore"}>
            <button data-cy="landing-explore-exbs-btn" className="relative text-3xl border-2 text-white p-6 m-6 font-marcellus">
              Explore Exhibitions
            </button>
          </Link>
          <Link to={"/artworks/search"}>
            <button data-cy="landing-search-artworks-btn" className="relative text-3xl border-2 text-white p-6 m-6 font-marcellus">
              Search Artworks
            </button>
          </Link>
        </div>
      </div>
    </LampContainer>
  );
};
export default Landing;
