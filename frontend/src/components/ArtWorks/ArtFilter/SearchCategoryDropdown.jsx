import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SearchFilterCheckBox } from "./SearchFilterCheckbox";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";






export const SearchCategoryDropdown = ({primaryCategory}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <li className="p-4 text-3xl bg-gray-50 flex flex-col items-start gap-3">
      <div className="flex items-center gap-4">
        <span>{primaryCategory} </span>
        <FontAwesomeIcon
          onClick={() => setShowDropdown((prev) => !prev)}
          className={`${
            showDropdown ? "rotate-90" : "-rotate-90"
          } cursor-pointer text-4xl`}
          icon={faChevronLeft}
        />
      </div>

      <div className=" w-full">
        {showDropdown && (
          <>
            {" "}
            <div className="relative flex flex-col justify-start">
              <input
                className=" border-4 border-neutral-900 p-2 mt-4 mb-6 w-full "
                type="text"
              />
              <FontAwesomeIcon
                className="absolute top-8 right-5  text-2xl "
                icon={faSearch}
              />
              <ul className=" overflow-y-scroll h-72">
                {Array.from({ length: 10 }).map((category, idx) => {
                  return <SearchFilterCheckBox key={category + idx} />;
                })}
              </ul>{" "}
            </div>
          </>
        )}
      </div>
    </li>
  );
};
