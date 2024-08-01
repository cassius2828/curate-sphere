const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require("../config/database");
const {
  models: { User },
} = sequelize;


// register route
const registerUser = async (req, res) => {
    res.status(201).json({message: 'this is the register route'})
    // res.send('register successful')
}

// login route 
const loginUser = async (req, res) => {
    // res.status(201).json({message: 'this is the login route'})
    // res.send('login successful')
    const user = {
        id: 1,
        username: "test",
    }
    const token = jwt.sign({user}, process.env.JWT_SECRET);
    res.status(200).json({token})
}

module.exports = {
    registerUser,
    loginUser
}