// env vars
const BASE_URL = process.env.HARVARD_API_BASE_URL;
const API_KEY = process.env.API_KEY;

///////////////////////////
// GET | get artworks
///////////////////////////
const getArtworks = async (req, res) => {
  // this will take our query obj and turn it into a useable string for the
  // API to consume
  // ! Queries are case sensitive to harvard api structure | be sure to provide correct name for form inputs
  // ! on front end

  const queriedFilter = getQueryString(req.query);

  try {
    const response = await fetch(
      `${BASE_URL}/object?apikey=${API_KEY}${queriedFilter}`
    );
    let data = await response.json();

    data.info.next = swapApiKeyAndPlaceholder(data.info.next, "API_KEY");

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
    data.info.next = swapApiKeyAndPlaceholder(data.info.next, "API_KEY");
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
  const { searchQuery } = req.query;

  // remove searchQuery key to add the rest of the queries to the end
  let queryObjWithoutSearchQuery = req.query;
  delete queryObjWithoutSearchQuery.searchQuery;

  const queriedFilter = getQueryString(queryObjWithoutSearchQuery);
  try {
    const response = await fetch(
      `${BASE_URL}/object?q=${searchQuery}&apikey=${API_KEY}${queriedFilter}`
    );
    let data = await response.json();
    data.info.next = swapApiKeyAndPlaceholder(data.info.next, "API_KEY");
    data.info.prev = "";
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `cannot get ${searchQuery} from harvard search api ` });
  }
};

///////////////////////////
// ? POST | Next page of artworks
///////////////////////////
const postNextPageOfArtworks = async (req, res) => {
  const { altUrl } = req.body;
  // the frontend removes the api key and replaces it with a placeholder | API_KEY
  // we select the string before and after the place holder, then insert our key in place of it
  const fullUrl = swapApiKeyAndPlaceholder(altUrl, API_KEY);

  try {
    const response = await fetch(fullUrl);
    let data = await response.json();
    data.info.next = swapApiKeyAndPlaceholder(data.info.next, "API_KEY");
    data.info.prev = "";
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `cannot get next page from harvard search api ` });
  }
};

module.exports = {
  getArtworks,
  getArtworkDetail,
  getFilterObjs,
  getArtworkBySearch,
  postNextPageOfArtworks,
};

///////////////////////////
// Functions
///////////////////////////

// transform obj to query str
const getQueryString = (query) => {
  if (!query) return;
  return Object.keys(query)
    .map((key) => `&${key}=${query[key]}`)
    .join("");
};

// replace api key with place holder
const swapApiKeyAndPlaceholder = (str, newValue, log) => {
  let apiKeyPattern;
  // if the value we want to put in is the real api key
  if (newValue !== "API_KEY") {
    apiKeyPattern = /(apikey=)(API_KEY)(&)/;
  } else {
    // if we want to add a placeholder
    apiKeyPattern = /(apikey=)([a-f0-9-]+)(&)/;
  }
  // Use match to extract the parts
  const matches = str?.match(apiKeyPattern);
  if (matches) {
    const beforeApiKey = str.substring(0, matches.index + matches[1].length); // ex: "https://api.harvardartmuseums.org/object?apikey="
    const afterApiKey = str.substring(matches.index + matches[0].length - 1); // ex: "&size=12&page=2"

    str = beforeApiKey + newValue + afterApiKey;

    return str;
  }
};
