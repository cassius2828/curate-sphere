import { useEffect, useState } from "react";
// context
import useGlobalContext from "../../context/global/useGlobalContext";
// idb config
import { clearStore, deleteEntireDatabase } from "../../utils/indexedDB.config";
// components
import FixedAlert from "../CommonComponents/Modals/FixedAlert";
import ResetCacheSection from "./ResetCacheSection";

const Settings = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  //   context
  const { scrollToTop } = useGlobalContext();
  //   reset filter data structure
  const resetCacheSections = [
    {
      title: "Reset Cached Artworks",
      paragraph: `If an artwork previously displayed an image but no longer does, the Harvard Art Museum API may have changed its photo URL, causing the cached artwork to reference an invalid URL. Resetting the artwork cache ensures you are viewing the most current photo URLs from the Harvard API. Note: Many images from the Harvard API do not have a public photo URL due to museum copyright restrictions. These are indicated by a "No Image" placeholder. If alt text is appearing instead of an image, it's advisable to refresh the artwork cache.`,
      handleAction: () => handleClearCache("artworks"),
    },
    {
      title: "Reset Cached Exhibitions",
      paragraph: `If a newly added artwork is not appearing in an exhibition, try refreshing the exhibition cache to retrieve the most current data. While we have mechanisms in place to handle this automatically, you may need to manually reset the cache if the issue persists.`,
      handleAction: () => handleClearCache("exhibitions"),
    },
    {
      title: "Reset Cached Filters",
      paragraph: `Artwork filters may take 5 to 10 seconds to load from our server. You should only refresh the filter cache if you experience issues with the current filter or when advised after a major update.`,
      handleAction: () => handleClearCache("filters"),
    },
    {
      title: "Reset All Cached Data",
      paragraph: `Resetting all cached data will delete the application’s local cache. The database will be recreated automatically on the next page refresh for filters or when you access artworks or exhibitions again.`,
      handleAction: () => handleDeleteIndexedDB(),
    },
  ];

  ///////////////////////////
  //   Handle Clear Cache Store
  ///////////////////////////
  const handleClearCache = async (storeName) => {
    try {
      const data = await clearStore(storeName);
      if (data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      console.log(err.message);
      setError(err.message);
    }
  };

  ///////////////////////////
  //   Handle Delete IDB
  ///////////////////////////
  const handleDeleteIndexedDB = async (storeName) => {
    try {
      const data = await deleteEntireDatabase(storeName);
      if (data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      console.log(err.message);
      setError(err.message);
    }
  };

  ///////////////////////////
  //   Scroll to Top
  ///////////////////////////
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      {message && (
        <FixedAlert message={message} success onClose={() => setMessage("")} />
      )}
      {error && <FixedAlert message={error} onClose={() => setError("")} />}
      <section className="mb-40 mt-32 md:mt-[10rem] flex flex-col items-center w-full font-marcellus">
        <h1 className="text-gray-900 text-5xl text-center mb-12">
          Reset Cached Data
        </h1>
        <p className="mx-auto p-12 w-full md:w-1/2 text-center text-xl md:text-2xl">
          Our application uses local caching to improve performance by storing
          frequently accessed data in your browser. You can clear this cache at
          any time to ensure you receive the latest information. Please note
          that clearing the cache may result in longer load times for the next
          data request.
        </p>
        <div className="mx-auto p-12 rounded-md w-full md:w-1/2 xl:w-1/4 bg-white shadow-lg">
          {resetCacheSections.map((section, index) => (
            <ResetCacheSection
              key={index}
              title={section.title}
              paragraph={section.paragraph}
              handleAction={section.handleAction}
            />
          ))}
        </div>
      </section>
    </>
  );
};
export default Settings;
