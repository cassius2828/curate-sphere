import { Link } from 'react-router-dom'
// import { getAllArtworks } from '../../services/artworkService';
import { LampContainer } from '../ui/lamp';

const Home = () => {
  // getAllArtworks()
  return (

      <LampContainer>
        <div className="relative z-50 min-h-screen w-screen flex flex-col gap-y-5 justify-center items-center">
          <h1 className="text-8xl text-white font-marcellus">Welcome, user</h1>
          <Link to="/exhibitions/dashboard">
            <button className="relative text-3xl border-2 text-white p-6 m-6 font-marcellus">My Exhibitions</button>
          </Link>
        </div>
      </LampContainer>
  );
};
export default Home;
