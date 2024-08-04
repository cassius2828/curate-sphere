const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

///////////////////////////
// Get | Get All Artworks
///////////////////////////
export const getAllArtworks = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/artworks`);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get all artworks`);
  }
};

///////////////////////////
// Get | Get Artwork Detail
///////////////////////////
export const getArtworkDetail = async (objectid) => {
  try {
    const response = await fetch(`${BACKEND_URL}/artworks/${objectid}`);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get object detail`);
  }
};
