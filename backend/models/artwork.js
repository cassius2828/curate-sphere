// models/Artwork.js
module.exports = (sequelize, DataTypes) => {
  const Artwork = sequelize.define("Artwork", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    objectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Artwork;
};
