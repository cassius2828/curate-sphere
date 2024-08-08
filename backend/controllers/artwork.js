const sequelize = require("../config/database");
const {
  models: { Artwork },
} = sequelize;
const BASE_URL = process.env.HARVARD_API_BASE_URL;
const API_KEY = process.env.API_KEY;

// totalrecordsperquery is how we will filter load results
///////////////////////////
// ? POST | get artworks
///////////////////////////
const postArtworks = async (req, res) => {
  // console.log(req.query)

  // this will take our query obj and turn it into a useable string for the
  // API to consume
  // ! Queries are case sensitive to harvard api structure | be sure to provide correct name for form inputs
  // ! on front end

  const queriedFilter = getQueryString(req.body);
  console.log(queriedFilter);
  try {
    const response = await fetch(
      `${BASE_URL}/object?apikey=${API_KEY}${queriedFilter}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "cannot get all artworks" });
  }
};

///////////////////////////
// GET | Artwork Detail
///////////////////////////
const getArtworkDetail = async (req, res) => {
  const { objectid } = req.params;

  try {
    if (!objectid) {
      return res.status(404).json({ error: "Object ID is missing" });
    }
    const response = await fetch(
      `${BASE_URL}/object/${objectid}?apikey=${API_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "cannot get selected artwork" });
  }
};
///////////////////////////
// GET | Filter Artwork Objs
///////////////////////////
const getFilterObjs = async (req, res) => {
  const { page, filter } = req.query;

  try {
    const response = await fetch(
      `${BASE_URL}/${filter}?apikey=${API_KEY}&size=100&page=${page}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `cannot get ${filter} objs from harvard api` });
  }
  // res.status(200).json({ page, filter });
};

///////////////////////////
// GET | Artwork Search
///////////////////////////
const getArtworkBySearch = async (req,res) => {
  const {query} = req.query
  console.log(query)
  try {
    const response = await fetch(
      `${BASE_URL}/object?q=${query}&apikey=${API_KEY}&size=24`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `cannot get ${query} from harvard search api ` });
  }
}

module.exports = {
  postArtworks,
  getArtworkDetail,
  getFilterObjs,getArtworkBySearch
};

///////////////////////////
// Functions
///////////////////////////

const getQueryString = (query) => {
  if (!query) return;
  return Object.keys(query)
    .map((key) => `&${key}=${query[key]}`)
    .join("");
};
