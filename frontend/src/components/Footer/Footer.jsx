// FontAwesome Icons
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// React Router
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="relative bg-gray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          {/* Contact and Social Media Section */}
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-gray-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-xl mt-0 mb-2 text-gray-600">
              Find us on the platforms below
            </h5>

            {/* Social Media Links */}
            <div className="mt-6 lg:mb-0 mb-6">
              {/* Cassius Links */}
              <div>
                <h4 className="text-xl my-3">Cassius</h4>
                <div className="flex">
                  <Link to={`https://github.com/cassius2828`}>
                    <button
                      className="bg-white shadow-lg font-normal h-20 w-20 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                      type="button"
                    >
                      <FontAwesomeIcon className="text-4xl" icon={faGithub} />
                    </button>
                  </Link>
                  <Link to={`https://www.linkedin.com/in/cassius-reynolds/`}>
                    <button
                      className="bg-white text-blue-600 shadow-lg font-normal h-20 w-20 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                      type="button"
                    >
                      <FontAwesomeIcon className="text-4xl" icon={faLinkedin} />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Mollie Links */}
              <div className="my-8">
                <h4 className="text-xl my-3">Mollie</h4>
                <div className="flex">
                  <Link to={`https://github.com/molliean`}>
                    <button
                      className="bg-white shadow-lg font-normal h-20 w-20 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                      type="button"
                    >
                      <FontAwesomeIcon className="text-4xl" icon={faGithub} />
                    </button>
                  </Link>
                  <Link to={`https://www.linkedin.com/in/mollie-anderson/`}>
                    <button
                      className="bg-white text-blue-600 shadow-lg font-normal h-20 w-20 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                      type="button"
                    >
                      <FontAwesomeIcon className="text-4xl" icon={faLinkedin} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation and Resources Section */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              {/* Navigation Links */}
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-500 text-md md:text-xl my-4 font-semibold mb-2">
                  Navigation
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      to={`/`}
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-md md:text-xl my-4"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/exhibitions/explore`}
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-md md:text-xl my-4"
                    >
                      Explore Exhibitions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/exhibitions/dashboard`}
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-md md:text-xl my-4"
                    >
                      My Exhibitions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/artworks/search`}
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-md md:text-xl my-4"
                    >
                      Search Artworks
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Other Resources Links */}
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-gray-500 text-md md:text-xl my-4 font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      to={`https://github.com/harvardartmuseums/api-docs`}
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-md md:text-xl my-4"
                    >
                      Harvard API Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/contact`}
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-md md:text-xl my-4"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-md md:text-xl my-4 text-gray-500 font-semibold py-1">
              Developed by{" "}
              <Link
                className="text-blue-950"
                to={`https://github.com/cassius2828`}
              >
                Cassius Reynolds
              </Link>{" "}
              and{" "}
              <Link
                className="text-blue-950"
                to={`https://github.com/molliean`}
              >
                Mollie Anderson
              </Link>{" "}
              <span id="get-current-year">{currentYear}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
