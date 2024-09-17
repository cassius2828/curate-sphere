import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCoverImg } from "../../services/exbService";
import LoaderRipple from "../CommonComponents/Loaders/LoaderRipple";

export const ExbCard = ({ title, date, location, id }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  ///////////////////////////
  // Get and Set Cover Img
  ///////////////////////////
  const fetchExbCoverImg = async () => {
    setIsLoadingImg(true);

    try {
      const data = await getCoverImg(id);
      if (!data.error) {
        setImgUrl(data);
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to get info of exb on backend`);
    } finally {
      setIsLoadingImg(false);
    }
  };
  useEffect(() => {
    fetchExbCoverImg();
  }, []);
  return (
    <li
      data-cy="exb-card"
      className="flex flex-col items-center w-full mt-10 md:flex-row md:max-w-[40rem] lg:max-w-[40rem] overflow-hidden shadow-md font-cardo "
    >
      {isLoadingImg ? (
        <div className="w-full md:w-1/2 md:h-full flex flex-col items-center gap-8">
          <LoaderRipple />
          <span className="capitalize"> image is loading...</span>
        </div>
      ) : (
        <img
          data-cy="exb-cover-img"
          className="w-full md:w-1/2 md:h-full object-cover"
          src={
            imgUrl
              ? imgUrl
              : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
          }
          alt={title}
        />
      )}
      <div className="flex flex-col justify-center gap-6 p-3 md:pl-6 md:w-1/2">
        <span data-cy="exb-card-title" className="text-3xl mt-4">
          {title}
        </span>
        <span data-cy="exb-card-date" className="text-2xl">
          Date: {date}
        </span>
        <span data-cy="exb-card-location" className="text-2xl">
          Location: {location}
        </span>
        <Link className="text-center" to={`/exhibition/${id}`}>
          <button
            data-cy="exb-card-view-details-btn"
            className="text-[12px] border-black border  w-3/4 mb-4"
          >
            View full details
          </button>
        </Link>
      </div>
    </li>
  );
};
