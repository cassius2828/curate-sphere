const sequelize = require("../config/database");
const {
  models: { Artwork },
} = sequelize;

// env vars
const BASE_URL = process.env.HARVARD_API_BASE_URL;
const API_KEY = process.env.API_KEY;

///////////////////////////
// ? POST | get artworks
///////////////////////////
const postArtworks = async (req, res) => {
  // this will take our query obj and turn it into a useable string for the
  // API to consume
  // ! Queries are case sensitive to harvard api structure | be sure to provide correct name for form inputs
  // ! on front end

  const queriedFilter = getQueryString(req.body);

  try {
    const response = await fetch(
      `${BASE_URL}/object?apikey=${API_KEY}${queriedFilter}`
    );
    let data = await response.json();
    data.info.next = replaceApikeyWithPlaceholder(data.info.next);
    data.info.prev = "";
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
    let data = await response.json();
    data.info.next = replaceApikeyWithPlaceholder(data.info.next);
    data.info.prev = "";
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `cannot get ${filter} objs from harvard api` });
  }
};

///////////////////////////
// GET | Artwork Search
///////////////////////////
const getArtworkBySearch = async (req, res) => {
  const { query } = req.query;
  try {
    const response = await fetch(
      `${BASE_URL}/object?q=${query}&apikey=${API_KEY}&size=24`
    );
    let data = await response.json();
    data.info.next = replaceApikeyWithPlaceholder(data.info.next);
    data.info.prev = "";
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `cannot get ${query} from harvard search api ` });
  }
};

const postNextPageOfArtworks = async (req, res) => {
  const { altUrl } = req.body;
  // the frontend removes the api key and replaces it with a placeholder | API_KEY
  // we select the string before and after the place holder, then insert our key in place of it
  const beforeApiKey = altUrl.slice(0, 48);
  const afterApiKey = altUrl.slice(55);
  const fullUrl = beforeApiKey + API_KEY + afterApiKey;
  try {
    const response = await fetch(fullUrl);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `cannot get next page from harvard search api ` });
  }
};

module.exports = {
  postArtworks,
  getArtworkDetail,
  getFilterObjs,
  getArtworkBySearch,
  postNextPageOfArtworks,
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

const replaceApikeyWithPlaceholder = (str) => {
  const apiKeyPattern = /(apikey=)([a-f0-9-]+)(&)/;
  // Use match to extract the parts
  const matches = str?.match(apiKeyPattern);
  if (matches) {
    const beforeApiKey = str.substring(0, matches.index + matches[1].length); // ex: "https://api.harvardartmuseums.org/object?apikey="
    const afterApiKey = str.substring(matches.index + matches[0].length - 1); // ex: "&size=12&page=2"
    str = beforeApiKey + "API_KEY" + afterApiKey;
    return str;
  }
};
