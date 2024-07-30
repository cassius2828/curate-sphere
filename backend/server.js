const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");
const { Sequelize } = require("sequelize");
const app = express();
const port = process.env.PORT;
// checks if we are running in dev or production
const host =
  process.env.NODE_ENV === "production" ? process.env.HOST : "localhost";

///////////////////////////
// Connect to DB
///////////////////////////
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host,
  dialect: "postgres",
});

// run this to test the DB connection | will not close by default
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

///////////////////////////
// Middleware
///////////////////////////
app.use(cors());
app.use(express.json());
// app.use(morgan())

///////////////////////////
// Routers
///////////////////////////
const testJwtRouter = require("./routes/test-jwt");

///////////////////////////
// Routes
///////////////////////////
app.use("/test-jwt", testJwtRouter);

app.listen(port || 3000, () => {
  console.log(`Server running on port ${port}`);
});
