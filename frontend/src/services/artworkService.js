const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { getItemIndexedDB, setItemIndexedDB } from "../utils/indexedDB.config";
// creates query string out of an object
const getQueryString = (query) => {
  let finalStr = `&size=${query?.size}`;
  if (!query) return;
  // this logic looks for nested objects and converts them to a pipe str if there are more than 1 value associated with it
  for (let primaryCategory in query) {
    if (typeof query[primaryCategory] === "object") {
      finalStr =
        finalStr +
        `&${primaryCategory}=` +
        Object.values(query[primaryCategory]).join("|");
    }
  }

  return finalStr;
};

//////////////////////////////////////////////////////
// GET | Get All Artworks With Filter
//////////////////////////////////////////////////////
export const getAllArtworks = async (filters) => {
  // this allows us to ensure the string will start as a query with a ? and all following
  // filters will follow a pattern of &filterKey=value
  const query = getQueryString(filters);
  const startQuery = "?" + query.slice(1);
  try {
    const response = await fetch(`${BACKEND_URL}/artworks/search${startQuery}`);
    const data = await response.json();
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

//////////////////////////////////////////////////////
// GET | Get All Artworks By Search
//////////////////////////////////////////////////////
export const getArtworkBySearch = async (searchQuery, filters) => {
  const filterQuery = getQueryString(filters);

  try {
    const response = await fetch(
      `${BACKEND_URL}/artworks/text-search/?searchQuery=${searchQuery}${filterQuery}`
    );
    const data = await response.json();
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
//  Get | Get Filter Objs
///////////////////////////
export const getFilterObjs = async (filter, page) => {
  const indexedDBKey = `${filter}-page${page}`;
  const cachedFilter = await getItemIndexedDB(indexedDBKey, "filter");
  if (cachedFilter) {
    return cachedFilter;
  }
  try {
    const response = await fetch(
      `${BACKEND_URL}/artworks/filter?filter=${filter}&page=${page}`
    );
    const data = await response.json();

    if (response.ok) {
      data.records.forEach((record) => {
        record.isChecked = false;
        record.clickCount = 0;
      });
      await setItemIndexedDB(indexedDBKey, data, "filter");
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get ${filter} objects`);
  }
};
///////////////////////////
// GET | Next page of artworks
///////////////////////////
export const postNextPageOfArtworks = async (altUrl) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ altUrl }),
  };
  try {
    const response = await fetch(`${BACKEND_URL}/artworks/next`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with DB to get next page of objects`);
  }
};
