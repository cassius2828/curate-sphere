const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");
const { Sequelize } = require("sequelize");

const app = express();
const port = process.env.PORT ? process.env.PORT : '3000';
// checks if we are running in dev or production


///////////////////////////
// Connect to DB
///////////////////////////
const {connectToDB, closeDBConnection} = require('./config/database')
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
const authRouter = require('./routes/auth')

///////////////////////////
// Routes
///////////////////////////
app.use("/test-jwt", testJwtRouter);
app.use('/auth', authRouter)

app.listen(port || 3000, () => {
  console.log(`Server running on port ${port}`);
});
