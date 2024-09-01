// React imports
import { useState } from "react";
// Context hooks
import useArtworkContext from "../../../context/artwork/useArtworkContext";
// Component imports
import { SearchCategoryDropdown } from "./SearchCategoryDropdown";

const ArtFilter = () => {
  // Local state for dropdown visibility
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Destructuring context values
  const {
    handleDisplayView,
    displayView,
    primaryCategories,
    century,
    classification,
    culture,
    medium,
    period,
    technique,
    worktype,
  } = useArtworkContext();

  // Ensures all filters are loaded before displaying the dropdown
  const allFiltersLoaded =
    century?.records.length > 0 &&
    classification?.records.length > 0 &&
    culture?.records.length > 0 &&
    medium?.records.length > 0 &&
    period?.records.length > 0 &&
    technique?.records.length > 0 &&
    worktype?.records.length > 0;

  // Toggle filter dropdown visibility
  const handleShowDropdown = () => {
    if (allFiltersLoaded) {
      setShowFilterDropdown((prev) => !prev);
    } else {
      alert("Filters are still loading...");
    }
  };

  return (
    <div className="flex gap-4 font-cardo mt-12 md:mt-0">
      {/* Filter Button */}
      <button
        onClick={handleShowDropdown}
        className="text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-xl w-full sm:w-auto px-8 py-4"
      >
        Filters
      </button>

      {/* Display Style Dropdown */}
      <select
        value={displayView}
        onChange={(e) => handleDisplayView(e.target.value)}
        name="art-display-style"
        id="art-display-style"
        className="text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-xl w-full sm:w-auto px-8 py-4"
      >
        <option disabled value="">
          Display Style
        </option>
        <option value="gallery">Gallery</option>
        <option value="list">List</option>
      </select>

      {/* Filter Dropdown */}
      {showFilterDropdown && (
        <ul className="shadow-md w-3/4 md:w-96 min-w-96 absolute top-full">
          {primaryCategories.map((category, idx) => (
            <SearchCategoryDropdown
              primaryCategory={category.title}
              subCategories={category.records}
              key={category.title + idx}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtFilter;
