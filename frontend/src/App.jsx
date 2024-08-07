import { Route, Routes } from "react-router";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import ArtSearch from "./components/ArtWorks/ArtSearch";
import ExbDashboard from './components/Exhibitions/ExbDashboard'
import ExbForm from './components/Exhibitions/ExbForm'
import ExbDetail from "./components/Exhibitions/ExbDetail";
import ArtDetail from "./components/ArtWorks/ArtDetail"
import useGlobalContext from "./context/global/useGlobalContext"
import ExbExplore from "./components/Exhibitions/ExbExplore";

function App() {
  // const user = true;
  const {user} = useGlobalContext()

  return (
    <>
      {" "}
      <Nav />
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks/search" element={<ArtSearch />} />
            <Route path="/exhibitions/dashboard" element={<ExbDashboard />}/>
            <Route path="/exhibitions/create" element={<ExbForm />}/>
            <Route path="/exhibitions/:id/edit" element={<ExbForm />}/>
            <Route path="/exhibition/:id" element={<ExbDetail />}/>
            <Route path='/artwork/:id' element={<ArtDetail />}/>
            <Route path='/exhibitions/explore' element={<ExbExplore />}/>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
