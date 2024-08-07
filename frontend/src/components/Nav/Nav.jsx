// import { Link } from "react-router-dom";
// import { NavListItem } from "./NavListItem";
// import useGlobalContext from "../../context/global/useGlobalContext";
// import { useState } from "react";



// const Nav = () => {
//   // const user = false;
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const {user, handleSignout} = useGlobalContext()

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   // console.log(user)
//   return (
//     <nav className="fixed z-50 top-0 left-0 w-full p-4 flex justify-between items-center bg-[#020617] text-gray-100 font-marcellus">
//       <Link to={`/`}>
//         <h1 className="text-2xl md:text-4xl lg:text-5xl ml-4 md:ml-12">Curate Sphere</h1>
//       </Link>
//       <div className="md:hidden mr-4">
//         <button onClick={toggleMenu} className="text-5xl focus:outline-none">
//           ☰
//         </button>
//       </div>
//       <ul className={`flex-col md:flex-row flex justify-end gap-6 md:gap-12 capitalize w-full md:w-1/2 items-center ${isMenuOpen ? "flex" : "hidden"} md:flex`}>
//         {!user ? (
//           <>
//             <Link to={`/login`}>
//               <li className="p-3 text-2xl ">login</li>
//             </Link>

//             <Link to={`/register`}>
//               <li className="p-3 text-2xl ">register</li>
//             </Link>
//           </>
//         ) : (
//           <>
//             <NavListItem
//               listItemText={`Exhibitions`}
//               dropDownItems={[
//                 {
//                   text: "explore exhibitions",
//                   path: "/exhibitions/explore",
//                 },
//                 {
//                   text: "create exhibition",
//                   path: "/exhibitions/create",
//                 },
//                 {
//                   text: "my exhibitions",
//                   path: "/exhibitions/dashboard",
//                 },
//               ]}
//             />
//             <Link to={`/artworks/search`}>
//               <li className="p-3 text-2xl ">search artworks</li>
//             </Link>{" "}
//             {/* <Link to={`/profile`}>
//               <li className="p-3 text-2xl ">profile</li>
//             </Link> */}
//             <Link to={`/`}>
//               <li onClick={handleSignout} className="p-3 text-2xl ">sign-out</li>
//             </Link>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };
// export default Nav;

import { Link } from "react-router-dom";
import { NavListItem } from "./NavListItem";
import useGlobalContext from "../../context/global/useGlobalContext";
import { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleSignout } = useGlobalContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed z-50 top-0 left-0 w-full p-4 flex justify-between items-center bg-[#020617] text-gray-100 font-marcellus">
      <Link to={`/`}>
        <h1 className="text-2xl md:text-4xl lg:text-5xl ml-4 md:ml-12">Curate Sphere</h1>
      </Link>
      <div className="relative md:hidden mr-4">
        <button onClick={toggleMenu} className="text-5xl focus:outline-none">
          ☰
        </button>
        {isMenuOpen && (
          <ul className="absolute right-0 mt-2 bg-[#020617] text-gray-100 font-marcellus flex flex-col items-start p-4 space-y-4 rounded-lg shadow-lg">
            {!user ? (
              <>
                <Link to={`/login`}>
                  <li className="p-3 text-2xl ">Login</li>
                </Link>

                <Link to={`/register`}>
                  <li className="p-3 text-2xl ">Register</li>
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
                  <li className="p-3 text-2xl ">Search Artworks</li>
                </Link>
                <Link to={`/`}>
                  <li onClick={handleSignout} className="p-3 text-2xl ">Logout</li>
                </Link>
              </>
            )}
          </ul>
        )}
      </div>
      <ul className="hidden md:flex justify-end gap-12 capitalize w-full md:w-1/2 items-center">
        {!user ? (
          <>
            <Link to={`/login`}>
              <li className="p-3 text-2xl ">Login</li>
            </Link>

            <Link to={`/register`}>
              <li className="p-3 text-2xl ">Register</li>
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
              isMobile={false} 
            />
            <Link to={`/artworks/search`}>
              <li className="p-3 text-2xl ">Search Artworks</li>
            </Link>
            <Link to={`/`}>
              <li onClick={handleSignout} className="p-3 text-2xl ">Logout</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
