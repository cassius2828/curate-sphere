// React and Router Imports
import { Route, Routes } from "react-router";
// Context Imports
import useGlobalContext from "./context/global/useGlobalContext";
// Authentication Components
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
// Navigation Components
import Nav from "./components/Nav/Nav";
// Home and Landing Components
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
// ArtWorks Components
import ArtSearch from "./components/ArtWorks/ArtSearch";
import ArtDetail from "./components/ArtWorks/ArtDetails/ArtDetail";
// Exhibitions Components
import ExbDashboard from "./components/Exhibitions/ExbDashboard";
import ExbForm from "./components/Exhibitions/ExbForm";
import ExbDetail from "./components/Exhibitions/ExbDetail";
import ExbExplore from "./components/Exhibitions/ExbExplore";
import NotFoundPage from "./components/CommonComponents/Errors/NotFoundPage";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import ConfirmEmailChange from "./components/Profile/ConfirmEmailChange";
import Settings from "./components/Settings";

function App() {
  const { user } = useGlobalContext();

  return (
    <>
      {" "}
      <Nav />
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks/search" element={<ArtSearch />} />
            <Route path="/exhibitions/dashboard" element={<ExbDashboard />} />
            <Route path="/exhibitions/create" element={<ExbForm />} />
            <Route path="/exhibitions/:id/edit" element={<ExbForm />} />
            <Route path="/exhibition/:id" element={<ExbDetail />} />
            <Route path="/artwork/:id" element={<ArtDetail />} />
            <Route path="/exhibitions/explore" element={<ExbExplore />} />
            <Route path="/profiles/:id" element={<Profile />} />
            <Route path="/confirm-email" element={<ConfirmEmailChange />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/artworks/search" element={<ArtSearch />} />
            <Route path="/exhibitions/dashboard" element={<ExbDashboard />} />
            <Route path="/exhibitions/create" element={<ExbForm />} />
            <Route path="/exhibitions/:id/edit" element={<ExbForm />} />
            <Route path="/exhibition/:id" element={<ExbDetail />} />
            <Route path="/artwork/:id" element={<ArtDetail />} />
            <Route path="/exhibitions/explore" element={<ExbExplore />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/confirm-email" element={<ConfirmEmailChange />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
