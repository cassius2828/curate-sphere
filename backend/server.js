const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");

const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
// checks if we are running in dev or production

///////////////////////////
// Connect to DB
///////////////////////////
const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Successfully connected to db ");
  } catch (err) {
    console.error("Unable to connect to the db", err);
  }
};
connectToDB();
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
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profiles");
const exhRouter = require("./routes/exhibition");
const artworkRouter = require("./routes/artwork");

///////////////////////////
// Routes
///////////////////////////
app.use("/test-jwt", testJwtRouter);
app.use("/auth", authRouter);
app.use("/profiles", profileRouter);
app.use("/exhibitions", exhRouter);
app.use("/artworks", artworkRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
