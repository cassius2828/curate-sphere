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
  const { user, formatDate } = useGlobalContext();

  const {
    handleGetExbDetail,
    handleGetAllExbs,
    handleDeleteExb,
    handleEditExb,
    myExbs,
    showExb,
  } = useExbContext();

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
              userId={exb.userId}
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
import { ExbCard } from "./ExbCard";
