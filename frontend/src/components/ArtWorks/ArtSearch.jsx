import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtGallery from "./ArtGallery";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useArtworkContext from "../../context/artwork/useArtworkContext";
import { FilterActionBtns } from "./ArtFilter/FilterActionBtns";
import ArtListMobile from "./ArtListMobile";
import ArtListDesktop from "./ArtListDesktop";
import { useEffect } from "react";
import useGlobalContext from "../../context/global/useGlobalContext";

///////////////////////////
// ArtSearch
///////////////////////////
const ArtSearch = () => {
  const { searchQuery, handleUpdateSearchQuery } = useArtworkContext();
  const { scrollToTop } = useGlobalContext();
  const {
    displayView,
    records,
    handleSearchArtworksByTitle,
    handleGetNextPageOfArtworks,
    artFilter,
    info,
  } = useArtworkContext();

  // uses input value to filter results based on text search
  const handleSearchQuery = async (e) => {
    const { value } = e.target;
    handleUpdateSearchQuery(value);
    await handleSearchArtworksByTitle(value, artFilter);
  };
  // find viewport width on load
  const isMobile = window.innerWidth;

  useEffect(() => {
    scrollToTop();
  }, []);

  // if no records then return
  if (!records) return;
  return (
    <section className="w-screen min-h-screen flex flex-col items-center">
      {/* title */}
      <h1 className="text-6xl font-marcellus">Art Works</h1>
      {/* search input */}
      <div className="relative w-3/4">
        <input
          onChange={handleSearchQuery}
          value={searchQuery}
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
      {info.next && (
        <button
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
