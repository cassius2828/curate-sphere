import {Link} from 'react-router-dom'
import { getAllArtworks } from '../../services/artworkService';

const Home = () => {
  getAllArtworks()
  return (
    <>
      <div className="min-h-screen w-screen flex flex-col gap-y-5 justify-center items-center">
        <h1 className="text-8xl">Welcome, user</h1>
        <Link to="/exhibitions/dashboard">
        <button className="text-4xl border-2 border-black p-5 m-6">My Exhibitions</button>

        </Link>
      </div>

    </>

  );
};
export default Home;
