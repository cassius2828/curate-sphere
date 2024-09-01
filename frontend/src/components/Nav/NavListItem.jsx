import { useState } from "react";
import { Link } from "react-router-dom";

export const NavListItem = ({ dropDownItems, listItemText, setIsMenuOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      {/* Main list item that shows dropdown on hover */}
      <li
        data-cy={`nav-category`}
        className="p-3 text-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {listItemText}

        {/* Dropdown menu */}
        <ul
          data-cy={`nav-dropdown-menu-${listItemText.toLowerCase()}`}
          className={`flex-col items-center justify-start bg-neutral-800 absolute w-full
            z-20 right-0 mr-full top-0 left-36 md:top-[99%] md:left-1/2 md:-translate-x-1/2 
            p-0 m-0 rounded-sm ${isHovered ? "h-auto flex" : "h-0 hidden"}`}
        >
          {/* Dropdown items */}
          {dropDownItems.map((item, idx) => {
            const formattedItemText = item.text.replace(" ", "-").toLowerCase();
            return (
              <Link
                data-cy={`nav-dropdown-item-${formattedItemText}`}
                key={item.text + idx}
                to={item.path}
              >
                <li
                  onClick={() => {
                    setIsHovered(false);
                    setIsMenuOpen(false);
                  }}
                  className="dropdown-li hover:bg-neutral-700 text-gray-100 relative z-10 p-3 text-xl capitalize"
                >
                  {item.text}
                </li>
              </Link>
            );
          })}
        </ul>
      </li>
    </div>
  );
};
