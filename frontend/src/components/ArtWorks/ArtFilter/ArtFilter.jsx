import { useState } from "react";
import { SearchCategoryDropdown } from "./SearchCategoryDropdown";
const filterCategories = [
  {
    primaryCategory: 'Classifications',
    subCategories: [
      "(not assigned)",
      "Accessories (non-art)",
      "Albums",
      "Amulets",
      "Architectural Elements",
      "Archival Material",
      "Armor",
      "Artists' Materials",
      "Artists' Tools",
      "Audiovisual Works",
      "Books",
      "Boxes",
      "Brick Stamps",
      "Calligraphy",
      "Cameos",
      "Casts",
      "Coins",
      "Costume",
      "Documents",
      "Drawings",
      "Fragments",
      "Frames",
      "Furnishings",
      "Furniture",
      "Gems",
      "Graphic Design",
      "Inscriptions",
      "Jewelry",
      "Lighting Devices",
      "Manuscripts",
      "Material Specimens",
      "Measuring Devices",
      "Medals and Medallions",
      "Mirrors",
      "Models",
      "Mosaics",
      "Multiples",
      "Musical Instruments",
      "Paintings",
      "Paintings with Calligraphy",
      "Paintings with Text",
      "Performance Artifacts",
      "Photographs",
      "Plaques",
      "Portfolios",
      "Prints",
      "Recreational Artifacts",
      "Riding Equipment",
      "Ritual Implements",
      "Rubbings",
      "Sculpture",
      "Seals",
      "Stained Glass",
      "Straus Materials",
      "Tablets",
      "Text",
      "Textile Arts",
      "Timepieces",
      "Tokens",
      "Tools and Equipment",
      "Unidentified",
      "Vessels",
      "Weapons and Ammunition"
    ]
  },
  {
    primaryCategory: 'Work Type',
    subCategories: []
  },
  {
    primaryCategory: 'Medium',
    subCategories: []
  },
  {
    primaryCategory: 'Technique',
    subCategories: []
  },
  {
    primaryCategory: 'Period',
    subCategories: []
  },
  {
    primaryCategory: 'Place',
    subCategories: []
  },
  {
    primaryCategory: 'Century',
    subCategories: []
  },
  {
    primaryCategory: 'Culture',
    subCategories: []
  },
  {
    primaryCategory: 'Gallery',
    subCategories: []
  }
];

const ArtFilter = () => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [displayView, setDisplayView] = useState("");
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
        onChange={(e) => setDisplayView(e.target.value)}
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
          {filterCategories.map((category, idx) => {
            return (
              <SearchCategoryDropdown
                primaryCategory={category}
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
