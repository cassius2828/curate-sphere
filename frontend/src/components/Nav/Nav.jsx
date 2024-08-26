import { Link } from "react-router-dom";
import { NavListItem } from "./NavListItem";
import useGlobalContext from "../../context/global/useGlobalContext";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import useExbContext from "../../context/exb/useExbContext";
import { useEffect, useState } from "react";
import LoaderText from "../CommonComponents/LoaderText";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleSignout, isLoading } = useGlobalContext();
  const { handleResetExbState } = useExbContext();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResetContextState = () => {
    // handleResetArtworkState();
    console.log("test");
    handleResetExbState();
  };

  useEffect(() => {
console.log(user.user.id)
  },[])

  return (
    <nav className="fixed z-50 top-0 left-0 w-full p-4 flex justify-between items-center bg-[#020617] text-gray-100 font-marcellus">
      <Link to={`/`}>
        <h1 className="text-4xl md:text-6xl  ml-4 md:ml-12">Curate Sphere</h1>
      </Link>
      {/* hamburger */}
      <div className="relative md:hidden mr-4">
        <button onClick={toggleMenu} className="text-5xl focus:outline-none">
          ☰
        </button>
        {isMenuOpen && (
          <ul className="absolute right-32 mt-2 bg-[#020617] text-gray-100 font-marcellus flex flex-col items-start p-4 space-y-4 rounded-lg shadow-lg">
            {isLoading ? (
              <LoaderText /> // This will show the loader when isLoading is true
            ) : (
              <>
                {!user ? (
                  <>
                    <NavListItem
                      // controls mobile menu
                      setIsMenuOpen={setIsMenuOpen}
                      listItemText={`Exhibitions`}
                      dropDownItems={[
                        {
                          text: "explore exhibitions",
                          path: "/exhibitions/explore",
                        },
                        {
                          text: "create exhibition",
                          path: "/exhibitions/create",
                        },
                        {
                          text: "my exhibitions",
                          path: "/exhibitions/dashboard",
                        },
                      ]}
                    />
                    {/* if artworks have not loaded then the link will not activate */}
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      className={isLoading ? `pointer-events-none` : ""}
                      to={`/artworks/search`}
                    >
                      <li className="p-3 text-2xl ">Search Artworks</li>
                    </Link>
                    <Link onClick={() => setIsMenuOpen(false)} to={`/login`}>
                      <li className="p-3 text-2xl ">Login</li>
                    </Link>

                    <Link onClick={() => setIsMenuOpen(false)} to={`/register`}>
                      <li className="p-3 text-2xl ">Register</li>
                    </Link>
                  </>
                ) : (
                  <>
                    <NavListItem
                      // controls mobile menu
                      setIsMenuOpen={setIsMenuOpen}
                      listItemText={`Exhibitions`}
                      dropDownItems={[
                        {
                          text: "explore exhibitions",
                          path: "/exhibitions/explore",
                        },
                        {
                          text: "create exhibition",
                          path: "/exhibitions/create",
                        },
                        {
                          text: "my exhibitions",
                          path: "/exhibitions/dashboard",
                        },
                      ]}
                    />
                    {/* if artworks have not loaded then the link will not activate */}
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      className={isLoading ? `pointer-events-none` : ""}
                      to={`/artworks/search`}
                    >
                      <li className="p-3 text-2xl ">Search Artworks</li>
                    </Link>{" "}
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      className={isLoading ? `pointer-events-none` : ""}
                      to={`/profiles/${user.user.id}`}
                    >
                      <li className="p-3 text-2xl ">Profile</li>
                    </Link>
                    <Link to={`/`}>
                      <li
                        onClick={() => {
                          handleResetContextState();
                          handleSignout();
                          setIsMenuOpen(false);
                        }}
                        className="p-3 text-2xl "
                      >
                        Logout
                      </li>
                    </Link>
                  </>
                )}
              </>
            )}
          </ul>
        )}
      </div>

      {/* desktop */}
      <ul className="hidden md:flex justify-end gap-12 capitalize w-full md:w-1/2 items-center">
        {isLoading ? (
          <LoaderText />
        ) : (
          <>
            <NavListItem
              setIsMenuOpen={setIsMenuOpen}
              listItemText={`Exhibitions`}
              dropDownItems={[
                {
                  text: "explore exhibitions",
                  path: "/exhibitions/explore",
                },
                {
                  text: "create exhibition",
                  path: "/exhibitions/create",
                },
                {
                  text: "my exhibitions",
                  path: "/exhibitions/dashboard",
                },
              ]}
            />
            <Link to={`/artworks/search`}>
              <li className="p-3 text-2xl">Search Artworks</li>
            </Link>
            {!user ? (
              <>
                <Link onClick={() => setIsMenuOpen(false)} to={`/login`}>
                  <li className="p-3 text-2xl">Login</li>
                </Link>

                <Link onClick={() => setIsMenuOpen(false)} to={`/register`}>
                  <li className="p-3 text-2xl">Register</li>
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className={isLoading ? `pointer-events-none` : ""}
                  to={`/profiles/${user.user.id}`}
                >
                  <li className="p-3 text-2xl ">Profile</li>
                </Link>
                <Link to={`/`}>
                  <li
                    onClick={() => {
                      handleResetContextState();
                      handleSignout();
                    }}
                    className="p-3 text-2xl"
                  >
                    Logout
                  </li>
                </Link>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
