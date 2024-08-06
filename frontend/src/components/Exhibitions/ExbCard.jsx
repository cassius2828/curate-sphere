import { Link } from "react-router-dom";


export const ExbCard = ({ title, date, location, id }) => {


    return (
      <li className="flex w-full md:w-[40rem] font-cardo">
        <img
          className="w-full md:w-1/2"
          src="https://nrs.hvrd.art/urn-3:HUAM:DDC251942_dynmc?width=3000&height=3000"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 pl-3">
          <span className="text-3xl">{title}</span>
          <span className="text-2xl">Date: {date}</span>
          <span className="text-2xl">Location: {location}</span>
          <Link to={`/exhibition/${id}`}>
            <button className="text-[12px] border-black border w-3/4 mx-auto">
              View full details
            </button>
          </Link>
        </div>
      </li>
    );
  };