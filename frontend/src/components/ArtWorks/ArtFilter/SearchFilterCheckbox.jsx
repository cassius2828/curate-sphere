import { useState } from "react";

export const SearchFilterCheckBox = ({ category = "inner category" }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <li className="flex items-center gap-4 p-3 bg-gray-200 ">
        <div
          onClick={() => {
            console.log(
              "This will call a function that updates the search query on the backend"
            );
            setIsChecked((prev) => !prev);
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