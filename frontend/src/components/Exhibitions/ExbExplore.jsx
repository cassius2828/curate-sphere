import { useEffect } from "react";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import { ExbCard } from "./ExbCard";

const ExbExplore = () => {
  const { exploreExbs } = useExbContext();
  const { formatDate } = useGlobalContext();
  const { handleGetAllExbs } = useExbContext();
  
  useEffect(() => {
    handleGetAllExbs();
  }, []);
  return (
    <section className="m-24">
      <h1 className="text-6xl mb-32 mt-52 font-marcellus text-center">
        Explore Exhibitions
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3  justify-items-center">
        {exploreExbs?.map((exb) => {
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
      </div>
    </section>
  );
};
export default ExbExplore;
