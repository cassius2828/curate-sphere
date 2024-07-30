const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// register route
const registerUser = async (req, res) => {
    // res.status(201).json({message: 'this is the register route'})
    res.send('register successful')
}

// login route 
const loginUser = async (req, res) => {
    // res.status(201).json({message: 'this is the register route'})
    res.send('login successful')
}

module.exports = {
    registerUser,
    loginUser
}