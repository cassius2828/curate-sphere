import { Link } from "react-router-dom";
import { LampContainer } from "../ui/lamp";
import useGlobalContext from "../../context/global/useGlobalContext";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import { useEffect } from "react";
import { getUser } from "../../services/authService";

const Home = () => {
  const { user, setUser } = useGlobalContext();
  const { handleGetAllArtworks, handleGetAllFilterObjs } = useArtworkContext();

  const fetchUser = async () => {
    try {
      const data = getUser();
      setUser(data);
    } catch (err) {
      console.error(err);
      console.log(`Could not get user | context`);
    }
  };

  useEffect(() => {
    handleGetAllArtworks();
    handleGetAllFilterObjs();
    fetchUser();
  }, []);
  return (
    <LampContainer>
      <div className="relative z-50 min-h-screen w-screen flex flex-col gap-y-5 justify-center items-center">
        <h1 className=" text-6xl md:text-8xl text-white font-marcellus capitalize">
          Welcome, {user?.user?.username}
        </h1>
        <Link to="/exhibitions/dashboard">
          <button className="relative text-3xl border-2 text-white p-6 m-6 font-marcellus">
            My Exhibitions
          </button>
        </Link>
      </div>
    </LampContainer>
  );
};
export default Home;
