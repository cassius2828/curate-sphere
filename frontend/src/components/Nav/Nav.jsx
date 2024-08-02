import { Link } from "react-router-dom";
import { NavListItem } from "./NavListItem";
import useGlobalContext from "../../context/useGlobalContext";

const Nav = () => {
  // const user = false;
  const {user} = useGlobalContext()
  console.log(user)
  return (
    <nav className="fixed z-50 top-0 left-0 w-full p-4 flex justify-between bg-gray-900 text-gray-100">
      <Link to={`/`}>
        <h1 className="text-5xl ml-12">Curate Sphere</h1>
      </Link>
      <ul className="flex justify-end gap-12 capitalize w-1/2">
        {!user ? (
          <>
            <Link to={`/login`}>
              <li className="p-3 text-2xl ">login</li>
            </Link>

            <Link to={`/register`}>
              <li className="p-3 text-2xl ">register</li>
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
            <Link to={`/sign-out`}>
              <li className="p-3 text-2xl ">sign-out</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Nav;
