import { useEffect } from "react";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import { ExbCard } from "./ExbCard";
import { Link } from "react-router-dom";

const ExbDashboard = () => {
  const { formatDate } = useGlobalContext();
  const {
    handleGetUserExbs,
    myExbs,
  } = useExbContext();
  
  useEffect(() => {
    handleGetUserExbs();
  }, []);
  return (
    <section className="flex flex-col mb-24 mx-24">
      <div className="flex gap-28 mb-20 items-center">
        <h1 className="text-6xl font-marcellus">My Exhibitions</h1>
        <Link to="/exhibitions/create">
          <button className="text-2xl border-black border px-6 py-1 font-cardo">
            Add New Exhibition
          </button>
        </Link>
      </div>
      <ul className="flex flex-col gap-10 font-cardo">
        {myExbs?.map((exb) => {
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
      </ul>
    </section>
  );
};
export default ExbDashboard;
