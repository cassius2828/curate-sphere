import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useArtworkContext from "../../../context/artwork/useArtworkContext";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import ArtSearchFilter from "./ArtFilter";

export const FilterActionBtns = () => {
  const {
    info,
    records,
    handleSizeFilter,
    handleResetFilterState,
    artFilter,
  } = useArtworkContext();
  return (
    <div className="flex flex-col md:flex-row w-3/4 justify-between items-center relative">
      {/* filter */}
      <ArtSearchFilter />
      {/* display num of objets */}
      <p className=" text-center mx-auto w-full  absolute top-0  md:w-auto md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-cardo">
        Showing <span data-cy="displayed-artworks" className="text-red-400">{records.length}</span> of{" "}
        <span data-cy="total-artworks-available" className="text-red-400">{info?.totalrecords}</span> objects
      </p>
      {/* load amount and btns */}
      <div className="flex gap-3 items-center mt-12 md:mt-0">
        <div className="flex flex-col gap-3 items-center md:mr-16">
          <span className="text-xl font-cardo">load amount</span>
          <select
          data-cy="filter-size-select"
            className="border rounded-md w-20 p-1 text-xl"
            onChange={(e) => handleSizeFilter(e.target.name, e.target.value)}
            name="size"
            id="size"
            value={artFilter.size}
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <button className="border p-3 bg-neutral-400">
          <FontAwesomeIcon
          data-cy="reset-filter-btn"
            onClick={handleResetFilterState}
            className="text-2xl text-gray-100"
            icon={faRotateBack}
          />
        </button>
      </div>
    </div>
  );
};
