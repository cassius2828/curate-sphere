const sequelize = require("../config/database");
const {
  models: { Artwork },
} = sequelize;
const BASE_URL = process.env.HARVARD_API_BASE_URL;
const API_KEY = process.env.API_KEY;
const getArtworks = async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/object?apikey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "cannot get all artworks" });
  }
};
const getArtworkDetail = async (req, res) => {
  res.status(201).json({ message: "this is the register route" });
  // res.send('register successful')
};
module.exports = {
  getArtworks,
  getArtworkDetail,
};


