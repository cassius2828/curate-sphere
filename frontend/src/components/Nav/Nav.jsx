// React imports
import { useState } from "react";
import { Link } from "react-router-dom";
// Context hooks
import useExbContext from "../../context/exb/useExbContext";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Nav = () => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // context
  const { handleResetExbState } = useExbContext();

  ///////////////////////////
  // Toggle Mobile Menu
  ///////////////////////////
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  ///////////////////////////
  // Reset Context State
  ///////////////////////////
  const handleResetContextState = () => {
    handleResetExbState();
    console.log("Context state reset");
  };

  return (
    <nav className="fixed z-50 top-0 left-0 w-full p-4 flex justify-between items-center bg-[#020617] text-gray-100 font-marcellus">
      <Link data-cy="home-link" to={`/`}>
        <h1 className="text-4xl md:text-6xl ml-4 md:ml-12">Curate Sphere</h1>
      </Link>

      <MobileNav
        handleResetContextState={handleResetContextState} isMenuOpen={isMenuOpen}
        handleToggleMenu={toggleMenu}
      />
      <DesktopNav
        handleResetContextState={handleResetContextState}
        setIsMenuOpen={setIsMenuOpen}
      />
    </nav>
  );
};

export default Nav;
