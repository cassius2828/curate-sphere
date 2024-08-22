import { useEffect, useState } from "react";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import { ExbCard } from "./ExbCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getUserExhibitions } from "../../services/exbService";
import Loader from "../CommonComponents/Loader";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import PromptSignIn from "../CommonComponents/PromptSignIn";

const ExbDashboard = () => {
  // state
  const [query, setQuery] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [displayedExbs, setDisplayedExbs] = useState([]);

  // context
  const { formatDate, user } = useGlobalContext();
  const { myExbs, handleSortExbs, dispatch, isLoading } = useExbContext();

  if (!user) {
    return <PromptSignIn text={'view your exhibitions'}/>;
  }

  ///////////////////////////
  // Sort Exbs
  ///////////////////////////
  const handleSortExhibitions = (e) => {
    const { value } = e.target;
    setSortInput(value);

    handleSortExbs(value, myExbs);
    setDisplayedExbs(myExbs);
  };

  ///////////////////////////
  // Search Exbs
  ///////////////////////////
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length > 3) {
      let searchResults = myExbs.filter((exb) => {
        let title = exb.title.toLowerCase();
        let query = value.toLowerCase();
        return title.includes(query);
      });
      setDisplayedExbs(searchResults);
    }
    if (value.length === 0) {
      setDisplayedExbs(myExbs);
    }
  };

  ///////////////////////////
  // Fetch User Exbs
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
        console.log("Unable to fetch user exbs | exbDashboard");
      } finally {
        dispatch({ type: "stopLoading/exb" });
      }
    };
    fetchUserExbs();
  }, []);
  if (isLoading) return <Loader />;

  return (
    <section className="flex flex-col mb-24 mx-24">
      <div className="flex flex-col md:flex-row  gap-28 mb-20 items-center">
        <div className="flex flex-col md:flex-row text-center md:text-start items-center gap-8">
          <h1 className="text-6xl font-marcellus">My Exhibitions</h1>
          <Link to="/exhibitions/create">
            <button className="text-2xl border-black border px-6 py-1 font-cardo">
              Add New Exhibition
            </button>
          </Link>
        </div>

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
      </div>
      <ul className="flex flex-col gap-10 font-cardo">
        {displayedExbs?.map((exb) => {
          return (
            <ExbCard
              key={exb.id}
              id={exb.id}
              userId={exb.userId}
              title={exb.title}
              date={`${formatDate(exb.startDate)} - ${formatDate(exb.endDate)}`}
              location={exb.location}
            />
          );
        })}
      </ul>
    </section>
  );
};
export default ExbDashboard;
