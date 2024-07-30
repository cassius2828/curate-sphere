import { Link } from "react-router-dom";
import { NavListItem } from "./NavListItem";

const Nav = () => {
  const user = false;
  return (
    <nav className="fixed top-0 left-0 w-full p-3 flex justify-between bg-gray-900 text-gray-100">
      <Link to={`/`}>
        <h1 className="text-4xl">title</h1>
      </Link>
      <ul className="flex justify-around capitalize">
        {user ? (
          <>
            <Link to={`/login`}>
              <li className="p-3 text-2xl ">login</li>
            </Link>

            <Link to={`/register`}>
              <li className="p-3 text-2xl ">register</li>
            </Link>
            <Link to={`/sign-out`}>
              <li className="p-3 text-2xl ">sign-out</li>
            </Link>
          </>
        ) : (
          <>
            <NavListItem
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
              <li className="p-3 text-2xl ">search artworks</li>
            </Link>{" "}
            <Link to={`/profile`}>
              <li className="p-3 text-2xl ">profile</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Nav;
