import ArtGallery from "./ArtGallery";
import ArtList from "./ArtList";
import ArtSearchFilter from "./ArtSearchFilter";

const ArtSearch = () => {
  const showList = false;
  return (
    <section className="w-screen min-h-screen flex flex-col items-center">
      {/* title */}
      <h1 className="text-6xl">Art Works</h1>
      {/* search input */}
      <div className="relative w-3/4">
        <input className=" border-4 border-neutral-900 p-2 mt-12 mb-6 w-full " type="text" />
        <span className="absolute">glass</span>
      </div>
      {/* filter and editgs */}
      <div>
        <ArtSearchFilter />
        <p>
          Showing <span>num</span> of <span>num</span> objects
        </p>
        <div>
          <span>load amount</span>
          <input type="number" name="load-artworks" id="load-artworks" />
        </div>
        <div>
          <button>reset search</button>
          <button>copy query</button>
        </div>
      </div>
      {/* results */}
      <div>{showList ? <ArtList /> : <ArtGallery />}</div>
    </section>
  );
};
export default ArtSearch;
