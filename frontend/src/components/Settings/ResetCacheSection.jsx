const ResetCacheSection = ({ title, paragraph, handleAction }) => {
  const dataCy = title.split(" ").slice(-1);
  return (
    <div data-cy={"reset" + dataCy} className="mb-8">
      <h2 className="text-2xl font-bold  text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{paragraph}</p>
      <button
        className="w-3/4 md:full  lg:w-1/2 px-8 py-3 text-xl  text-white transition-colors duration-200 bg-[#020617] rounded-lg hover:bg-[#2f375c] focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={handleAction}
      >
        {title}
      </button>
    </div>
  );
};
export default ResetCacheSection;
