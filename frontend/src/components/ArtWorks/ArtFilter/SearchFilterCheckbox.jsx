import { useEffect, useState } from "react";
import useArtworkContext from "../../../context/artwork/useArtworkContext";

export const SearchFilterCheckBox = ({
  category = "inner category",
  primaryCategoryKey,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { handleSelectFilters, handleRemoveFilter } = useArtworkContext();
   primaryCategoryKey = primaryCategoryKey.toLowerCase();
  const formatCategory = () => {
    // tech
    // medium
    // class
    // prominence
    // culture
    // century
    // divison
    // work types
    // period
    const modStr = category[0].toLocaleUpperCase() + category.slice(1);
    return modStr;
  };

  const formatedCategoryValue = formatCategory(category);

  useEffect(() => {
    // function to filter results of artworks
    if (isChecked) {
      handleSelectFilters(primaryCategoryKey, formatedCategoryValue);
    } else if (!isChecked && clickCount > 0) {
      handleRemoveFilter(primaryCategoryKey, formatedCategoryValue);
      console.log("it happens now");
    }
    console.log(clickCount);
  }, [isChecked]);
  return (
    <li className="flex items-center gap-4 p-3 bg-gray-200 ">
      <div
        onClick={() => {
          console.log(
            "This will call a function that updates the search query on the backend"
          );
          setIsChecked((prev) => !prev);
          setClickCount((prev) => prev + 1);
          formatCategory();
        }}
        className="border-2 relative z-10 border-black p-3 cursor-pointer"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          {isChecked ? "X" : ""}
        </span>
      </div>
      <span className="capitalize">{category}</span>
    </li>
  );
};
