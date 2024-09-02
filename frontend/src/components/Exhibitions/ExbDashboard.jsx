// Import React and hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import context hooks
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// Import components and services
import { ExbCard } from "./ExbCard";
import { getUserExhibitions } from "../../services/exbService";
import Loader from "../CommonComponents/Loaders/Loader";
import PromptSignIn from "../CommonComponents/Modals/PromptSignIn";
import Masonry from "react-masonry-css";
// Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

///////////////////////////
// ExbDashboard Component
///////////////////////////
const ExbDashboard = () => {
  // Local state for managing form inputs and displayed exhibitions
  const [query, setQuery] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [displayedExbs, setDisplayedExbs] = useState([]);

  // Global context states and functions
  const { formatDate, user } = useGlobalContext();
  const { myExbs, handleSortExbs, dispatch, isLoading } = useExbContext();

  // Masonry grid breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    850: 2,
    600: 1,
  };

  ///////////////////////////
  // Sort Exhibitions
  ///////////////////////////
  const handleSortExhibitions = (e) => {
    const { value } = e.target;
    setSortInput(value);
    handleSortExbs(value, myExbs);
    setDisplayedExbs(myExbs);
  };

  ///////////////////////////
  // Search Exhibitions
  ///////////////////////////
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length > 3) {
      const searchResults = myExbs.filter((exb) =>
        exb.title.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedExbs(searchResults);
    } else if (value.length === 0) {
      setDisplayedExbs(myExbs);
    }
  };

  ///////////////////////////
  // Fetch User Exhibitions
  ///////////////////////////
  useEffect(() => {
    const fetchUserExbs = async () => {
      dispatch({ type: "startLoading/exb" });
      try {
        const data = await getUserExhibitions(user?.user.id);
        if (!data.error) {
          setDisplayedExbs(data);
        }
      } catch (err) {
        console.error(err);
        console.log("Unable to fetch user exhibitions | ExbDashboard");
      } finally {
        dispatch({ type: "stopLoading/exb" });
      }
    };
    fetchUserExbs();
  }, [dispatch, user]);

  // Prompt user to sign in if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen">
        <PromptSignIn text={"view your exhibitions"} />;
      </div>
    );
  }

  // Show loader while exhibitions are being fetched
  if (isLoading) return <Loader />;

  return (
    <section className="flex flex-col mb-24 mx-24">
      <div className="flex flex-col md:flex-row gap-28 mb-20 items-center">
        {/* Header and add new exhibition button */}
        <div className="flex flex-col md:flex-row text-center md:text-start items-center gap-8">
          <h1 data-cy="exb-dashboard-title" className="text-6xl font-marcellus">My Exhibitions</h1>
          <Link to="/exhibitions/create">
            <button data-cy="exb-dashboard-add-new-exb-btn" className="text-2xl border-black border px-6 py-1 font-cardo">
              Add New Exhibition
            </button>
          </Link>
        </div>

        {/* Search and sort options */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-1/2 gap-8 mb-20 mx-auto">
          <div className="relative w-full max-w-[40rem]">
            <input
            data-cy="exb-dashboard-search-exb-input"
              onChange={handleSearchInputChange}
              value={query}
              className="border-4 border-neutral-900 p-2 w-full text-2xl"
              type="text"
            />
            <FontAwesomeIcon
              className="absolute top-1/4 right-5 text-2xl"
              icon={faSearch}
            />
          </div>
          <select
          data-cy="exb-dashboard-sort-select"
            value={sortInput}
            onChange={handleSortExhibitions}
            className="border-black border-2 px-4 py-2"
            name="exb-sort"
            id="exb-sort"
          >
            <option disabled value="">
              Sort Exhibitions
            </option>
            <option value="newest">Newest Added</option>
            <option value="oldest">Oldest Added</option>
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
          </select>
        </div>
      </div>

      {/* Display exhibitions in a masonry grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid gap-8"
        columnClassName="masonry-grid_column"
      >
        {myExbs?.length > 0  ? displayedExbs.map((exb) => (
          <ExbCard
            key={exb.id}
            id={exb.id}
            userId={exb.userId}
            title={exb.title}
            date={`${formatDate(exb.startDate)} - ${formatDate(exb.endDate)}`}
            location={exb.location}
          />
        )) : <h1 data-cy="no-user-exbs-text" className="text-4xl w-full">You do not have any exhibitions yet. Create one now!</h1>}
      </Masonry>
    </section>
  );
};

export default ExbDashboard;
