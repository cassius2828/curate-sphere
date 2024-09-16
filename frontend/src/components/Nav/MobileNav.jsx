import { Link } from "react-router-dom";
import LoaderText from "../CommonComponents/Loaders/LoaderText";
import { NavListItem } from "./NavListItem";
import useGlobalContext from "../../context/global/useGlobalContext";


const MobileNav = ({handleToggleMenu, isMenuOpen, setIsMenuOpen,handleResetContextState}) => {
  const { user, handleSignout, isLoading } = useGlobalContext();


  return (
    <div className="relative md:hidden mr-4">
      <button
        data-cy="hamburger-btn"
        onClick={handleToggleMenu}
        className="text-5xl focus:outline-none"
      >
        ☰
      </button>
      {isMenuOpen && (
        <ul
          data-cy="mobile-nav-ul"
          className="absolute right-32 mt-2 bg-[#020617] text-gray-100 font-marcellus flex flex-col items-start p-4 space-y-4 rounded-lg shadow-lg"
        >
          {isLoading ? (
            <>
              <LoaderText />
              <Link
                data-cy="mobile-nav-settings"
                onClick={() => setIsMenuOpen(false)}
                to={`/settings`}
              >
                <li className="p-3 text-2xl ">Settings</li>
              </Link>{" "}
              <Link
                data-cy="mobile-nav-login"
                onClick={() => setIsMenuOpen(false)}
                to={`/login`}
              >
                <li className="p-3 text-2xl ">Login</li>
              </Link>
              <Link
                data-cy="mobile-nav-register"
                onClick={() => setIsMenuOpen(false)}
                to={`/register`}
              >
                <li className="p-3 text-2xl ">Register</li>
              </Link>
            </>
          ) : (
            <>
              {!user ? (
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
                  <Link
                    data-cy="mobile-nav-artwork-search"
                    onClick={() => setIsMenuOpen(false)}
                    className={isLoading ? `pointer-events-none` : ""}
                    to={`/artworks/search`}
                  >
                    <li className="p-3 text-2xl ">Search Artworks</li>
                  </Link>
                  <Link
                    data-cy="mobile-nav-login"
                    onClick={() => setIsMenuOpen(false)}
                    to={`/login`}
                  >
                    {" "}
                    <Link
                      data-cy="mobile-nav-settings"
                      onClick={() => setIsMenuOpen(false)}
                      to={`/settings`}
                    >
                      <li className="p-3 text-2xl ">Settings</li>
                    </Link>{" "}
                    <li className="p-3 text-2xl ">Login</li>
                  </Link>
                  <Link
                    data-cy="mobile-nav-register"
                    onClick={() => setIsMenuOpen(false)}
                    to={`/register`}
                  >
                    <li className="p-3 text-2xl ">Register</li>
                  </Link>
                </>
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
                  <Link
                    data-cy="mobile-nav-search-artworks"
                    onClick={() => setIsMenuOpen(false)}
                    className={isLoading ? `pointer-events-none` : ""}
                    to={`/artworks/search`}
                  >
                    <li className="p-3 text-2xl ">Search Artworks</li>
                  </Link>
                  <Link
                    data-cy="mobile-nav-profile-link"
                    onClick={() => setIsMenuOpen(false)}
                    className={isLoading ? `pointer-events-none` : ""}
                    to={`/profiles/${user.user.id}`}
                  >
                    <li className="p-3 text-2xl ">Profile</li>
                  </Link>
                  <Link
                    data-cy="mobile-nav-settings"
                    onClick={() => setIsMenuOpen(false)}
                    to={`/settings`}
                  >
                    <li className="p-3 text-2xl ">Settings</li>
                  </Link>{" "}
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
  );
};
export default MobileNav;
