// React imports
import { useEffect } from "react";
// FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// Context hooks
import useArtworkContext from "../../context/artwork/useArtworkContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// Component imports
import ArtGallery from "./ArtDisplay/ArtGallery";
import { FilterActionBtns } from "./ArtFilter/FilterActionBtns";
import ArtListMobile from "./ArtDisplay/ArtListMobile";
import ArtListDesktop from "./ArtDisplay/ArtListDesktop";

///////////////////////////
// ArtSearch
///////////////////////////
const ArtSearch = () => {
  // Extracting values and functions from artwork context
  const { searchQuery, handleUpdateSearchQuery } = useArtworkContext();
  const {
    displayView,
    records,
    handleSearchArtworksByTitle,
    handleGetNextPageOfArtworks,
    artFilter,
    info,
  } = useArtworkContext();

  // Extracting global context function
  const { scrollToTop } = useGlobalContext();

  // Handles search input changes and performs the artwork search
  const handleSearchQuery = async (e) => {
    const { value } = e.target;
    handleUpdateSearchQuery(value);
    await handleSearchArtworksByTitle(value, artFilter);
  };

  // Find viewport width to determine mobile or desktop view
  const isMobile = window.innerWidth;

  // Scrolls to top on component mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // If no records are available, return nothing
  if (!records) return;

  return (
    <section className="w-screen min-h-screen flex flex-col items-center">
      {/* title */}
      <h1 className="text-6xl font-marcellus">Art Works</h1>
      {/* search input */}
      <div className="relative w-3/4">
        <input
        data-cy="art-search-input"
          onChange={handleSearchQuery}
          value={searchQuery}
          className="border-4 border-neutral-900 p-2 mt-12 mb-6 w-full text-2xl"
          type="text"
        />
        <FontAwesomeIcon
          className="absolute top-1/2 right-5 text-2xl"
          icon={faSearch}
        />
      </div>
      {/* filter and editing buttons */}
      <FilterActionBtns />
      {/* results display */}
      <div className="w-full">
        {displayView === "list" ? (
          <>
            {/* Renders mobile or desktop based on viewport width */}
            {isMobile < 768 ? <ArtListMobile /> : <ArtListDesktop />}
          </>
        ) : (
          <ArtGallery />
        )}
      </div>
      {/* Load more button if there are more pages */}
      {info.next && (
        <button
        data-cy="load-more-btn"
          onClick={handleGetNextPageOfArtworks}
          className="my-20 border rounded-md bg-neutral-900 text-gray-100 px-8 py-4 text-2xl capitalize"
        >
          load more
        </button>
      )}
    </section>
  );
};

export default ArtSearch;
