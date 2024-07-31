import { Link } from "react-router-dom";

const ArtList = () => {
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
          {Array.from({ length: 10 }).map((artwork, idx) => (
            <tr key={artwork + idx} className="hover:bg-gray-100">
              {/* artwork info */}
              <td className="py-2 px-4 text-2xl border-b">
                <img
                  src="https://nrs.hvrd.art/urn-3:HUAM:62187_dynmc?width=3000&height=3000"
                  alt={``}
                  className="w-36 h-36 rounded-md mx-auto"
                />
              </td>{" "}
              {/* year */}
              <td className="py-2 px-4 text-2xl border-b">year</td>
              {/* artist */}
              <td className="py-2 px-4 text-2xl border-b text-center">
               artist
              </td>
              {/* title */}
              <td className="py-2 px-4 text-2xl border-b text-center">
             title
              </td>
              {/* style */}
              <td className="py-2 px-4 text-2xl border-b text-center">
               style
              </td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ArtList;
