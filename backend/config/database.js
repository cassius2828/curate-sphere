const {Sequelize} = require('sequelize');
const applyExtraSetup = require('../models/applyExtraStep')
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const host =
  process.env.NODE_ENV === "production" ? process.env.HOST : "localhost";

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host,
  dialect: "postgres",
});

// run this to test the DB connection | will not close by default
const {DataTypes} = require('sequelize')

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to db ");
  } catch (err) {
    console.error("Unable to connect to the db", err);
  }
};

// Function to close the DB connection if needed
const closeDBConnection = async () => {
  try {
    await sequelize.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error closing the connection", err);
  }
};

const modelDefiners = [
    require('../models/user'),
    require('../models/exhibition'),
    require('../models/artpiece')
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, DataTypes);
}

applyExtraSetup(sequelize);


module.exports = {sequelize, connectToDB, closeDBConnection}