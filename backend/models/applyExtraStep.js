//////////////////////////////////////////////////////
// This is where we will combine all of our models together
//////////////////////////////////////////////////////
const { DataTypes } = require("sequelize");
function applyExtraSetup(sequelize) {
  const { Exhibition, ArtPiece } = sequelize.models;
  const ExbArtworks = sequelize.define("ExbArtworks", {
    ExbId: {
      type: DataTypes.INTEGER,
      references: {
        model: Exhibition,
        key: "id",
      },
    },
    ArtPieceId: {
      type: DataTypes.INTEGER,
      references: {
        model: ArtPiece,
        key: "id",
      },
    },
  });

  ArtPiece.belongsToMany(Exhibition, { through: ExbArtworks });
  Exhibition.belongsToMany(ArtPiece, { through: ExbArtworks });
}
module.exports = applyExtraSetup;


