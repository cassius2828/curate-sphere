import { useEffect, useState } from "react";
import { SearchCategoryDropdown } from "./SearchCategoryDropdown";
import useArtworkContext from "../../../context/artwork/useArtworkContext";

const ArtFilter = () => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const { handleDisplayView, displayView, primaryCategories } =
    useArtworkContext();
  // worktype is the last filter that is loaded from the api, so if it has content in its records array,
  //  then all filters are loaded and ready tobe accessed
  const { worktype } = useArtworkContext();
  const allFiltersLoaded = worktype.records.length > 0;
  const handleShowDropdown = () => {
    if (allFiltersLoaded) {
      setShowFilterDropdown((prev) => !prev);
    }
  };
  return (
    <div className="flex gap-4 font-cardo mt-12 md:mt-0">
      <button
        onClick={handleShowDropdown}
        className={`text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-xl w-full sm:w-auto px-8 py-4 `}
      >
        Fitlers
      </button>
      <select
        value={displayView}
        onChange={(e) => {
          handleDisplayView(e.target.value);
        }}
        name="art-display-style"
        id="art-display-style"
        className={`text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-xl w-full sm:w-auto px-8 py-4 `}
      >
        <option disabled value="">
          Display Style
        </option>
        <option value="gallery">Gallery View</option>
        <option value="list">List View</option>
      </select>
      {/* dropdown */}
      {showFilterDropdown && (
        <ul className="shadow-md w-full md:w-72 min-w-[25vw] absolute top-full">
          {primaryCategories.map((category, idx) => {
            return (
              <SearchCategoryDropdown
                primaryCategory={category.title}
                subCategories={category.records}
                key={category.title + idx}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default ArtFilter;
