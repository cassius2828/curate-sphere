import { Link } from "react-router-dom";
import userecordContext from "../../context/artwork/useArtworkContext";
import Loader from "../CommonComponents/Loader";
import DisplayError from "../CommonComponents/DisplayError";
import useArtworkContext from "../../context/artwork/useArtworkContext";

const ArtList = () => {
  const { records, isLoading, isError } = useArtworkContext();

  if (isLoading) return <Loader />;
  if (isError) return <DisplayError />;

  return (
    <div className="overflow-x-auto my-12 w-3/4 mx-auto">
      <table className="min-w-full bg-white border border-gray-200">
        {/* head */}
        <thead>
          <tr>
            <th className="py-2 px-4 text-2xl border-b">Image</th>
            <th className="py-2 px-4 text-2xl border-b">Year</th>
            <th className="py-2 px-4 text-2xl border-b">Artist</th>
            <th className="py-2 px-4 text-2xl border-b">Title</th>{" "}
            <th className="py-2 px-4 text-2xl border-b">Style</th>
            <th className="py-2 px-4 text-2xl border-b">Details</th>
            <th className="py-2 px-4 text-2xl border-b">Add to Exhibition</th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {/* // ! sync these values with what we would get from the harvard api */}
          {records.map((record) => (
            <ArtListRow
              img={record.primaryimageurl}
              division={record.division}
              title={record.title}
              year={record.dated}
              details={record.description}
              key={record.id}
              people={record.people}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ArtList;

export const ArtListRow = ({ year, people, division, title, img }) => {
  return (
    <tr className="hover:bg-gray-100">
      {/* record info */}
      <td className="py-2 px-4 text-2xl border-b">
        <img
          src={
            img
              ? img
              : `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`
          }
          alt={title}
          className="w-36 h-36 rounded-md mx-auto object-cover"
        />
      </td>{" "}
      {/* year */}
      <td className="py-2 px-4 text-2xl border-b">{year}</td>
      {/* artist */}
      <td className="py-2 px-4 text-2xl border-b text-center">
        {" "}
        {people?.map((person) => (
          <span key={person.personid}>
            {person.role}: {person.name}
          </span>
        ))}
      </td>
      {/* title */}
      <td className="py-2 px-4 text-2xl border-b text-center">{title}</td>
      {/* style */}
      <td className="py-2 px-4 text-2xl border-b text-center">{division}</td>
      <td className="py-2 px-4 text-2xl border-b text-center">
        <Link to={``}>
          <button className="border px-3 py-1 text-xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
            details
          </button>
        </Link>
      </td>
      {/* add to exb */}
      <td className="py-2 px-4 text-2xl border-b text-center">
        <Link to={``}>
          <button
            type="button"
            className="border px-3 py-1 text-xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
          >
            Add to Exb
          </button>
        </Link>
      </td>
    </tr>
  );
};
