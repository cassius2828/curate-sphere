import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtGallery from "./ArtGallery";
import ArtList from "./ArtList";
import ArtSearchFilter from "./ArtFilter/ArtFilter";
import {
  faLink,
  faRotateBack,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useArtworkContext from "../../context/artwork/useArtworkContext";

///////////////////////////
// ArtSearch
///////////////////////////
const ArtSearch = () => {
  const [loadAmountVal, setLoadAmountVal] = useState(12);
 const {displayView} = useArtworkContext()

  return (
    <section className="w-screen min-h-screen flex flex-col items-center">
      {/* title */}
      <h1 className="text-6xl">Art Works</h1>
      {/* search input */}
      <div className="relative w-3/4">
        <input
          className=" border-4 border-neutral-900 p-2 mt-12 mb-6 w-full  text-2xl"
          type="text"
        />
        <FontAwesomeIcon
          className="absolute top-1/2 right-5 text-2xl "
          icon={faSearch}
        />
      </div>
      {/* filter and editgs */}
      <FilterActionBtns />
      {/* results */}
      <div className="w-full">{displayView ? <ArtList /> : <ArtGallery />}</div>
      <button className="my-20 border rounded-md bg-neutral-900 text-gray-100 px-8 py-4 text-2xl capitalize">load more</button>
    </section>
  );
};
export default ArtSearch;


///////////////////////////
// FilterActionBtns
///////////////////////////
export const FilterActionBtns = () => {
  const {info, records} = useArtworkContext()
  return (
    <div className="flex w-3/4 justify-between items-center relative">
      {/* filter */}
      <ArtSearchFilter />
      {/* display num of objets */}
      <p className=" absolute top-0 w-full md:w-auto md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
        Showing <span className="text-red-400">{records.length}</span> of{" "}
        <span className="text-red-400">{info?.totalrecords}</span> objects
      </p>
      {/* load amount and btns */}
      <div className="flex gap-3 items-center mt-12 md:mt-0">
        <div className="flex flex-col gap-3 items-center md:mr-16">
          <span className="text-xl">load amount</span>

          <select
            className="border rounded-md w-20 p-1 text-xl"
            onChange={() =>
              console.log(
                "This will be a function that communicates with the backend to determine how many artworks to load at a time"
              )
            }
            name="load-artworks"
            id="load-artworks"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <button className="border p-3 bg-neutral-400">
          <FontAwesomeIcon
            onClick={() =>
              alert(
                "This will reset all the search filters and the state for filters and load amount"
              )
            }
            className="text-2xl text-gray-100"
            icon={faRotateBack}
          />
        </button>
        <button
          onClick={() =>
            alert(
              "this will copy a link for the user to past into their browser if desired"
            )
          }
          className="border p-3 bg-neutral-400"
        >
          <FontAwesomeIcon className="text-2xl text-gray-100" icon={faLink} />
        </button>
      </div>
    </div>
  );
};
