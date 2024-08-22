import { useEffect, useState } from "react";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import { ExbCard } from "./ExbCard";
import { getAllExhibitions } from "../../services/exbService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "../CommonComponents/Loader";
import Masonry from "react-masonry-css";

const ExbExplore = () => {
  // state
  const [query, setQuery] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [displayedExbs, setDisplayedExbs] = useState([]);

  // context
  const { formatDate, user } = useGlobalContext();
  const { handleGetAllExbs, handleSortExbs, exploreExbs, dispatch, isLoading } =
    useExbContext();

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    850: 2,
    600: 1,
  };

  ///////////////////////////
  // Sort Exbs
  ///////////////////////////
  const handleSortExhibitions = (e) => {
    const { value } = e.target;
    setSortInput(value);
    handleSortExbs(value, exploreExbs);
    setDisplayedExbs(exploreExbs);
  };

  ///////////////////////////
  // Search Exbs
  ///////////////////////////
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length > 3) {
      let searchResults = exploreExbs.filter((exb) => {
        let title = exb.title.toLowerCase();
        let query = value.toLowerCase();
        return title.includes(query);
      });
      setDisplayedExbs(searchResults);
    }
    if (value.length === 0) {
      setDisplayedExbs(exploreExbs);
    }
  };

  ///////////////////////////
  // Fetch All Exbs
  ///////////////////////////
  useEffect(() => {
    const fetchAllExbs = async () => {
      dispatch({ type: "startLoading/exb" });

      try {
        const data = await getAllExhibitions(user?.user.id);
        setDisplayedExbs(data);
      } catch (err) {
        console.error(err);
        console.log("Unable to fetch all exbs | ExbExplore");
      } finally {
        dispatch({ type: "stopLoading/exb" });
      }
    };
    fetchAllExbs();
  }, []);

  ///////////////////////////
  // Initial Fetch For All Exbs
  ///////////////////////////
  useEffect(() => {
    handleGetAllExbs();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <section className="m-24">
      <h1 className="text-6xl mb-32 mt-52 font-marcellus text-center">
        Explore Exhibitions
      </h1>
      {/* search */}
      <div className=" flex flex-col md:flex-row  items-center justify-center w-full md:w-1/2 gap-8 mb-20 mx-auto">
        <div className="relative w-full max-w-[40rem]">
          <input
            onChange={handleSearchInputChange}
            value={query}
            className=" border-4 border-neutral-900 p-2 w-full  text-2xl"
            type="text"
          />
          <FontAwesomeIcon
            className="absolute top-1/4 right-5 text-2xl "
            icon={faSearch}
          />
        </div>
        <select
          value={sortInput}
          onChange={handleSortExhibitions}
          className="border-black border-2 px-4 py-2"
          name="exb-sort"
          id="exb-sort"
        >
          <option disabled value="">
            Sort Exbs
          </option>
          <option value="newest">Newest Added</option>
          <option value="oldest">Oldest Added</option>
          <option value="a-z">A to Z</option>
          <option value="z-a">Z to A</option>
        </select>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid gap-8"
        columnClassName="masonry-grid_column"
      >
        {displayedExbs?.map((exb) => {
        return (
          <ExbCard
            key={exb.id}
            id={exb.id}
            title={exb.title}
            date={`${formatDate(exb.startDate)} - ${formatDate(exb.endDate)}`}
            location={exb.location}
          />
        );
      })}
      </Masonry>
    </section>
  );
};
export default ExbExplore;
