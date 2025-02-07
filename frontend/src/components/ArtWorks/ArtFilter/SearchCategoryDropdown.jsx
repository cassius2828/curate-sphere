import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SearchFilterCheckBox } from "./SearchFilterCheckbox";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchCategoryDropdown = ({ primaryCategory, subCategories }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [displaySubCategories, setDisplaySubCategories] =
    useState(subCategories);

  ///////////////////////////
  // Search Functions / Actions
  ///////////////////////////
  const handleSearchQuery = (e) => {
    const { value } = e.target;
    filterSubCategoriesBySearch(value);
  };

  const filterSubCategoriesBySearch = (searchQuery) => {
    // begins search when query is at least 3 chars long
    if (searchQuery.length > 2)
      setDisplaySubCategories(
        Object.values(subCategories).filter((category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    // resets results if user cleared search
    if (searchQuery.length === 0) setDisplaySubCategories(subCategories);
  };
  ///////////////////////////
  // Handle Show Dropdown
  //////////////////////////F
  const handleShowDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <li className="p-4 text-3xl bg-gray-50 flex flex-col items-start gap-3">
      <div className="flex items-center gap-4">
        <span>{primaryCategory} </span>
        <FontAwesomeIcon
          onClick={handleShowDropdown}
          className={`${
            showDropdown ? "rotate-90" : "-rotate-90"
          } cursor-pointer text-4xl`}
          icon={faChevronLeft}
        />
      </div>

      <div className=" w-full">
        {/* dropdown */}
        {showDropdown && (
          <>
            {" "}
            <div className="relative flex flex-col justify-start">
              {/* search input */}
              <input
              data-cy="subcategory-search-input"
                onChange={handleSearchQuery}
                className=" border-4 border-neutral-900 p-2 mt-4 mb-6 w-full "
                type="text"
              />
              <FontAwesomeIcon
                className="absolute top-8 right-5  text-2xl "
                icon={faSearch}
              />
              {/* subcategories */}
              <ul data-cy="subcategory-dropdown-ul" className=" overflow-y-scroll h-72">
                {Object.values(displaySubCategories)?.map((category, idx) => {
                  return (
                    <SearchFilterCheckBox
                      primaryCategoryKey={primaryCategory}
                      category={category}
                      key={category.id}
                    />
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </li>
  );
};
