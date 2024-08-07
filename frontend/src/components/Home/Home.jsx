import { Link } from 'react-router-dom'
// import { getAllArtworks } from '../../services/artworkService';
import { LampContainer } from '../ui/lamp';
import useGlobalContext from "../../context/global/useGlobalContext";


const Home = () => {
  // getAllArtworks()
  const { user } = useGlobalContext();
  console.log(user.user.username)

  return (

      <LampContainer>
        <div className="relative z-50 min-h-screen w-screen flex flex-col gap-y-5 justify-center items-center">
          <h1 className="text-8xl text-white font-marcellus">Welcome, {user.user.username}</h1>
          <Link to="/exhibitions/dashboard">
            <button className="relative text-3xl border-2 text-white p-6 m-6 font-marcellus">My Exhibitions</button>
          </Link>
        </div>
      </LampContainer>
  );
};
export default Home;
