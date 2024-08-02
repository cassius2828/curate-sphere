const {Sequelize} = require('sequelize');
const {applyExtraSetup} = require('../models/extraStep')

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host:'localhost',
  dialect: "postgres",
});


const User = require('../models/user')(sequelize, Sequelize.DataTypes);
const Exhibition = require('../models/exhibition')(sequelize, Sequelize.DataTypes);
const Artwork = require('../models/artwork')(sequelize, Sequelize.DataTypes);


applyExtraSetup(sequelize);


module.exports = sequelize;