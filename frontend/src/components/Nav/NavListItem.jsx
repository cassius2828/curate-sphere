import { useState } from "react";
import { Link } from "react-router-dom";

export const NavListItem = ({
  dropDownItems,
  listItemText,
  onClick,
  isMobile,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <li
        className=" p-3 text-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {listItemText}
        <ul
          className={`flex-col items-center justify-start bg-neutral-800 absolute w-full
            z-20 right-0 mr-full top-0 left-36  md:top-[99%] md:left-1/2 md:-translate-x-1/2" 
           p-0 m-0 rounded-sm ${isHovered ? "h-auto flex" : "h-0 hidden"}`}
        >
          {dropDownItems.map((item, idx) => {
            return (
              <Link  key={item.text + idx} to={item.path}>
                <li
                  onClick={() => setIsHovered(false)}
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
