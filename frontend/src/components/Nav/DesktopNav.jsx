import { Link } from "react-router-dom";
import LoaderText from "../CommonComponents/Loaders/LoaderText";
import useGlobalContext from "../../context/global/useGlobalContext";
import { NavListItem } from "./NavListItem";

const DesktopNav = ({ setIsMenuOpen, handleResetContextState }) => {
  const { user, handleSignout, isLoading } = useGlobalContext();

  return (
    <ul
      data-cy="desktop-nav-ul"
      className="hidden md:flex justify-end gap-12 capitalize w-full md:w-1/2 items-center"
    >
      {isLoading ? (
        <>
          <LoaderText />
          <Link
            data-cy="desktop-nav-settings"
            onClick={() => setIsMenuOpen(false)}
            to={`/settings`}
          >
            <li className="p-3 text-2xl ">Settings</li>
          </Link>
          <Link
            data-cy="desktop-nav-login"
            onClick={() => setIsMenuOpen(false)}
            to={`/login`}
          >
            <li className="p-3 text-2xl ">Login</li>
          </Link>
          <Link
            data-cy="desktop-nav-register"
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
              { text: "explore exhibitions", path: "/exhibitions/explore" },
              { text: "create exhibition", path: "/exhibitions/create" },
              { text: "my exhibitions", path: "/exhibitions/dashboard" },
            ]}
          />
          <Link data-cy="desktop-nav-artwork-search" to={`/artworks/search`}>
            <li className="p-3 text-2xl">Search Artworks</li>
          </Link>

          {!user ? (
            <>
              {" "}
              <Link
                data-cy="desktop-nav-settings"
                onClick={() => setIsMenuOpen(false)}
                to={`/settings`}
              >
                <li className="p-3 text-2xl ">Settings</li>
              </Link>
              <Link
                data-cy="desktop-nav-login"
                onClick={() => setIsMenuOpen(false)}
                to={`/login`}
              >
                <li className="p-3 text-2xl">Login</li>
              </Link>
              <Link
                data-cy="desktop-nav-register"
                onClick={() => setIsMenuOpen(false)}
                to={`/register`}
              >
                <li className="p-3 text-2xl">Register</li>
              </Link>
            </>
          ) : (
            <>
              <Link
                data-cy="desktop-nav-profile"
                onClick={() => setIsMenuOpen(false)}
                className={isLoading ? `pointer-events-none` : ""}
                to={`/profiles/${user?.user?.id}`}
              >
                <li className="p-3 text-2xl ">Profile</li>
              </Link>
              <Link
                data-cy="desktop-nav-settings"
                onClick={() => setIsMenuOpen(false)}
                to={`/settings`}
              >
                <li className="p-3 text-2xl ">Settings</li>
              </Link>
              <Link data-cy="desktop-nav-logout" to={`/`}>
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
  );
};
export default DesktopNav;
