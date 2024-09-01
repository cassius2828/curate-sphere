// React Router
import { Link } from "react-router-dom";
// Custom Hooks and Contexts
import useGlobalContext from "../../context/global/useGlobalContext";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import useExbContext from "../../context/exb/useExbContext";
// UI Components
import { LampContainer } from "../ui/lamp";
// Services
import { getUser } from "../../services/authService";
// React Hooks
import { useEffect } from "react";

const Home = () => {
  const { user, setUser, setIsLoading } = useGlobalContext();
  const { handleGetAllArtworks, handleGetAllFilterObjs, records } =
    useArtworkContext();
  const { handleGetUserExbs, myExbs } = useExbContext();

  ///////////////////////////
  // Fetches User
  ///////////////////////////
  const fetchUser = async () => {
    try {
      const data = getUser();
      setUser(data);
    } catch (err) {
      console.error(err);
      console.log(`Could not get user | context`);
    }
  };

  //////////////////////////////////////////////////////
  // Fetches User, Artworks, Filters, and User Exbs
  //////////////////////////////////////////////////////
  // this prevents redundant fetch calls if necessary data already exists
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // user
      if (!user) {
        fetchUser();
        console.log("fetched user");
      }
      // artworks
      if (records.length === 0) {
        await handleGetAllArtworks();
        await handleGetAllFilterObjs();
        console.log("fetched filters and artworks");
      }
      // user exbs
      if (myExbs.length === 0) {
        await handleGetUserExbs();
        console.log("fetched user exbs");
      }
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to fetch all data | user, artworks, filter objs, user exbs`
      );
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
      <div className="relative z-50 min-h-screen w-screen flex flex-col gap-y-5 justify-center items-center">
        <h1 data-cy="welcome-message" className=" text-6xl md:text-8xl text-white font-marcellus capitalize">
          Welcome, {user?.user?.username}
        </h1>
        <Link to="/exhibitions/dashboard">
          <button data-cy="user-exb-btn" className="relative text-3xl border-2 text-white p-6 m-6 font-marcellus">
            My Exhibitions
          </button>
        </Link>
      </div>
    </LampContainer>
  );
};
export default Home;
