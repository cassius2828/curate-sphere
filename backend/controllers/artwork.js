const sequelize = require("../config/database");
const {
  models: { Artwork },
} = sequelize;

// register route
const getArtworks = async (req, res) => {
  res.status(201).json({ message: "this is the register route" });
  // res.send('register successful')
};

module.exports = {
  getArtworks,
};
