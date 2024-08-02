// models/Artwork.js
module.exports = (sequelize, DataTypes) => {
  const Artwork = sequelize.define("Artwork", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // changed to all lowercase to match harvard api naming convention
    objectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Artwork;
};
