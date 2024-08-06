import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import { ExbCard } from "./ExbCard";


const ExbExplore = () => {
  const { exploreExbs } = useExbContext();
  const { formatDate } = useGlobalContext();
  return (
    <section className="m-24">
      <h1 className="text-6xl mb-32 mt-52 font-marcellus text-center">
        Explore Exhibitions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {exploreExbs.map((exb) => {
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

// ==========================================================================================//
// ============ Update the below to be FilterExbButtons, create ExbSearchFilter =============//
// ==========================================================================================//

// export const FilterActionBtns = () => {
//   return (
//     <div className="flex w-3/4 justify-between items-center relative">
//       {/* filter */}
//       <ArtSearchFilter />
//       {/* display num of objets */}
//       <p className=" absolute top-0 w-full md:w-auto md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
//         Showing <span className="text-red-400">num</span> of{" "}
//         <span className="text-red-400">num</span> objects
//       </p>
//       {/* load amount and btns */}
//       <div className="flex gap-3 items-center mt-12 md:mt-0">
//         <div className="flex flex-col gap-3 items-center md:mr-16">
//           <span className="text-xl">load amount</span>

//           <select
//             className="border rounded-md w-20 p-1 text-xl"
//             onChange={() =>
//               console.log(
//                 "This will be a function that communicates with the backend to determine how many artworks to load at a time"
//               )
//             }
//             name="load-artworks"
//             id="load-artworks"
//           >
//             <option value="12">12</option>
//             <option value="24">24</option>
//             <option value="50">50</option>
//             <option value="100">100</option>
//           </select>
//         </div>
//         <button className="border p-3 bg-neutral-400">
//           <FontAwesomeIcon
//             onClick={() =>
//               alert(
//                 "This will reset all the search filters and the state for filters and load amount"
//               )
//             }
//             className="text-2xl text-gray-100"
//             icon={faRotateBack}
//           />
//         </button>
//         <button
//           onClick={() =>
//             alert(
//               "this will copy a link for the user to past into their browser if desired"
//             )
//           }
//           className="border p-3 bg-neutral-400"
//         >
//           <FontAwesomeIcon className="text-2xl text-gray-100" icon={faLink} />
//         </button>
//       </div>
//     </div>
//   );
// };
