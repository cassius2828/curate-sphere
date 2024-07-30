import { Route, Routes } from "react-router";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import ArtSearch from "./components/ArtWorks/ArtSearch";

function App() {
  const user = true;

  return (
    <>
      {" "}
      <Nav />
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks/search" element={<ArtSearch />} />
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
