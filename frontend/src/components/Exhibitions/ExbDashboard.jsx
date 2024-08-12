import { useEffect, useState } from "react";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import { ExbCard } from "./ExbCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ExbDashboard = () => {
  const [query, setQuery] = useState();
  const [sortInput, setSortInput] = useState("");
  const { formatDate } = useGlobalContext();

  const { handleGetUserExbs, myExbs, handleSortUserExbs } = useExbContext();
  const handleSortExhibitions = (e) => {
    const { value } = e.target;
    setSortInput(value);
    handleSortUserExbs(value);
  };
  useEffect(() => {
    handleGetUserExbs();
  }, []);
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
        <div className=" flex items-center justify-start w-1/2 gap-8">
          <div className="relative w-full max-w-[40rem]">
            <input
              onChange={setQuery}
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
            <option value="">Sort Exbs</option>
            <option value="newest">Newest Added</option>
            <option value="oldest">Oldest Added</option>
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
          </select>
        </div>
      </div>
      <ul className="flex flex-col gap-10 font-cardo">
        {myExbs?.map((exb) => {
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
