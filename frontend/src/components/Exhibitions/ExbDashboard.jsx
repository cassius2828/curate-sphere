import { Link } from "react-router-dom";
const initialFormData = {
  title: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
};
const ExbDashboard = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useGlobalContext();

  const {
    handleGetExbDetail,
    handleGetAllExbs,
    handleDeleteExb,
    handleEditExb,
    myExbs,
    showExb,
  } = useExbContext();
  const formatDate = (date) => {
    let formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="flex flex-col ml-32 mb-24">
      <button
        onClick={() => {
          handleEditExb("1", formData);
          console.log("click");
        }}
      >
        {user.user.username}
      </button>
      <div className="flex gap-28 mb-20 items-center">
        <h1 className="text-6xl font-marcellus">My Exhibitions</h1>
        <Link to="/exhibitions/create">
          <button className="text-2xl border-black border px-6 py-1 font-cardo">
            Add New Exhibition
          </button>
        </Link>
      </div>

      {/* {exhibitions.length == 0 ? 
      (<p>No exhibitions yet!</p>
      ) : (
       */}
      <ul className="flex flex-col gap-10 font-cardo">
        {/* exhibitions.map((exhibition) => 
          (<ExbCard 
            key={exhibition.id} 
            title= {exhibition.title} 
            date={`exhibition.startDate - exhibition.endDate`} 
            location={exhibition.location} ))} */}
        {myExbs.map((exb) => {
          return (
            <ExbCard
              key={exb.id}
              id={exb.id}
              title={exb.title}
              date={`${formatDate(exb.startDate)} - ${formatDate(exb.endDate)}`}
              location={exb.location}
            />
          );
        })}

        {/* <ExbCard

${exb.startDate.toLocaleDateString("en-us", {month:'short', day: 'numeric', year:'numeric'})}


          title={`Van Gogh Retrospective`}
          date={`Jan 1 - Mar 1, 2025`}
          location={`LACMA`}
        />
        <ExbCard
          title={`Van Gogh Retrospective`}
          date={`Jan 1 - Mar 1, 2025`}
          location={`LACMA`}
        /> */}
      </ul>
    </section>
  );
};
export default ExbDashboard;

import React, { useEffect, useState } from "react";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";

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
