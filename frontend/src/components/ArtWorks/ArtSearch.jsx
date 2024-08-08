import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtGallery from "./ArtGallery";

import ArtSearchFilter from "./ArtFilter/ArtFilter";
import {
  faLink,
  faRotateBack,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import { getArtworkBySearch } from "../../services/artworkService";
import { FilterActionBtns } from "./ArtFilter/FilterActionBtns";
import ArtListMobile from "./ArtListMobile";
import ArtListDesktop from "./ArtListDesktop";

///////////////////////////
// ArtSearch
///////////////////////////
const ArtSearch = () => {
  const [loadAmountVal, setLoadAmountVal] = useState(12);
  const [query, setQuery] = useState("");
  const {
    displayView,
    records,
    dispatch,
    handleGetAllArtworks,
    handleSearchArtworksByTitle,
  } = useArtworkContext();
  // uses input value to filter results based on text search
  const handleSearchQuery = async (e) => {
    const { value } = e.target;
    setQuery(value);
    await handleSearchArtworksByTitle(value);
    console.log(query);
    console.log(records);
  };
  const isMobile = window.innerWidth
  if (!records) return;
  return (
    <section className="w-screen min-h-screen flex flex-col items-center">
      {/* title */}
      <h1 className="text-6xl font-marcellus">Art Works</h1>
      {/* search input */}
      <div className="relative w-3/4">
        <input
          onChange={handleSearchQuery}
          value={query}
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
      <div className="w-full">
        {displayView === "list" ? (
          // renders mobile vs desktop based on viewport
          <>{isMobile < 768 ? <ArtListMobile /> : <ArtListDesktop />}</>
        ) : (
          <ArtGallery />
        )}
      </div>
      <button className="my-20 border rounded-md bg-neutral-900 text-gray-100 px-8 py-4 text-2xl capitalize">
        load more
      </button>
    </section>
  );
};
export default ArtSearch;
