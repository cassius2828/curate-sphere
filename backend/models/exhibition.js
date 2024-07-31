// set up exhibition model with sequelize - this model belongs to user
const {  DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Exhibition", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
  });
};
