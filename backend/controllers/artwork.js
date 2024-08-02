const sequelize = require("../config/database");
const {
  models: { Artwork },
} = sequelize;
const BASE_URL = process.env.HARVARD_API_BASE_URL;
const API_KEY = process.env.API_KEY;

// totalrecordsperquery is how we will filter load results

const getArtworks = async (req, res) => {
  // console.log(req.query)

  // this will take our query obj and turn it into a useable string for the
  // API to consume
  // ! Queries are case sensitive to harvard api structure | be sure to provide correct name for form inputs
  // ! on front end
  const queriedFilter = getQueryString(req.query);
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

// const sampleObjId = 153503;
const getArtworkDetail = async (req, res) => {
  // getting the artwork
  // user clicks btn that will pass state data to the service function
  // a handle func will contain the data pulled from params, send it as a param to service func
  // we are doing a get req so this will be a query
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
module.exports = {
  getArtworks,
  getArtworkDetail,
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
