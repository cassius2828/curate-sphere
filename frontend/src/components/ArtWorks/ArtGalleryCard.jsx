const ArtGalleryCard = () => {
  return (
    <div className="shadow-md rounded-md p-4 text-gray-900">
      <img
        width="275"
        src="https://nrs.hvrd.art/urn-3:HUAM:62187_dynmc?width=3000&height=3000"
        alt="sample image"
      />
      <div className="mt-6 text-2xl flex flex-col gap-4">
        <span>year</span>
        <span>artist</span>
        <span className="text-gray-700 text-3xl">title</span>
        <span>style</span>
        <div className="flex justify-between items-center">
          <span
            onClick={() => alert("this will take you to the detail page")}
            className="cursor-pointer"
          >
            details
          </span>
          <button
            onClick={() =>
              alert(
                "This will allow a user to add an artpiece to their exhibition. It will bring up a modal or page to choose an exhibition to add it to"
              )
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArtGalleryCard;
