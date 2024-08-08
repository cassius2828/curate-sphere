///////////////////////////
// FilterActionBtns

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useArtworkContext from "../../../context/artwork/useArtworkContext";
import { faLink, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import ArtSearchFilter from "./ArtFilter";
///////////////////////////
export const FilterActionBtns = () => {
    const { info, records, handleSelectFilters, handleResetFilterState } =
      useArtworkContext();
    return (
      <div className="flex w-3/4 justify-between items-center relative">
        {/* filter */}
        <ArtSearchFilter />
        {/* display num of objets */}
        <p className=" absolute top-0 w-full md:w-auto md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-cardo">
          Showing <span className="text-red-400">{records.length}</span> of{" "}
          <span className="text-red-400">{info?.totalrecords}</span> objects
        </p>
        {/* load amount and btns */}
        <div className="flex gap-3 items-center mt-12 md:mt-0">
          <div className="flex flex-col gap-3 items-center md:mr-16">
            <span className="text-xl font-cardo">load amount</span>
            <select
              className="border rounded-md w-20 p-1 text-xl"
              onChange={(e) => handleSelectFilters(e.target.name, e.target.value)}
              name="size"
              id="size"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <button className="border p-3 bg-neutral-400">
            <FontAwesomeIcon
              onClick={handleResetFilterState}
              className="text-2xl text-gray-100"
              icon={faRotateBack}
            />
          </button>
          <button
            onClick={() =>
              alert(
                "this will copy a link for the user to past into their browser if desired"
              )
            }
            className="border p-3 bg-neutral-400"
          >
            <FontAwesomeIcon className="text-2xl text-gray-100" icon={faLink} />
          </button>
        </div>
      </div>
    );
  };