import { useState } from "react";
import { SearchCategoryDropdown } from "./SearchCategoryDropdown";
import useArtworkContext from "../../../context/artwork/useArtworkContext";

const ArtFilter = () => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const { handleDisplayView, displayView } = useArtworkContext();
  const { artworkFilterData } = useArtworkContext();
  return (
    <div className="flex gap-4">
      <button
        onClick={() => setShowFilterDropdown((prev) => !prev)}
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
      {showFilterDropdown && (
        <ul className="shadow-md w-full md:w-72 min-w-[25vw] absolute top-full">
          {artworkFilterData.map((category, idx) => {
            return (
              <SearchCategoryDropdown
                primaryCategory={category.primaryCategory}
                subCategories={category.subCategories}
                key={category + idx}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default ArtFilter;
