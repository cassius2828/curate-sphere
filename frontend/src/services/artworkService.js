const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

//////////////////////////////////////////////////////
// ? POST | Get All Artworks With Filter
//////////////////////////////////////////////////////
export const getAllArtworks = async (filters) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  };
  try {
    const response = await fetch(`${BACKEND_URL}/artworks/search`, options);
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

///////////////////////////
// ? get | Get Culture Objs
///////////////////////////
export const getFilterObjs = async (filter, page) => {
  // const options = {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(page),
  // };
  try {
    const response = await fetch(
      `${BACKEND_URL}/artworks/filter?filter=${filter}&page=${page}`
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get ${filter} objects`);
  }
};
