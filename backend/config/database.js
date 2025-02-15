// const dotenv = require("dotenv");
// dotenv.config();
const { Sequelize } = require("sequelize");
const applyExtraSetup = require("../models/applyExtraStep");

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const host =
  process.env.NODE_ENV === "production" ? process.env.HOST : "localhost";
let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host,
    dialect: "postgres",
    logging: false,
  });
}

const User = require("../models/user")(sequelize, Sequelize.DataTypes);
const Exhibition = require("../models/exhibition")(
  sequelize,
  Sequelize.DataTypes
);
const Artwork = require("../models/artwork")(sequelize, Sequelize.DataTypes);

applyExtraSetup(sequelize);

module.exports = sequelize;
