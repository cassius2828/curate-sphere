import useArtworkContext from "../../../context/artwork/useArtworkContext";
import Loader from "../../CommonComponents/Loaders/Loader";
import ArtGalleryCard from "./ArtGalleryCard";
import Masonry from "react-masonry-css";
const ArtGallery = () => {
  const { records, isLoading } = useArtworkContext();
  // masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    850: 2,
    600: 1,
  };

  if (isLoading) return <Loader />;
  return (
    <div className="w-3/4 mx-auto mt-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {records.map((record, idx) => {
          return (
            <ArtGalleryCard
              ArtworkObjectid={record.objectid}
              img={record.primaryimageurl}
              division={record.division}
              title={record.title}
              year={record.dated}
              details={record.description}
              key={record.id + idx}
              people={record.people}
            />
          );
        })}
      </Masonry>
    </div>
  );
};
export default ArtGallery;
