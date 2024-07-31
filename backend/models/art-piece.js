// set up art-piece model with sequelize - this model is a many-to-many relationship with exhibition
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ArtPiece", {
    objectId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
