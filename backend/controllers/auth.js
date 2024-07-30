const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// register route
const registerUser = async (req, res) => {
    res.status(201).json({message: 'this is the register route'})
}

// login route 
const loginUser = async (req, res) => {
    res.status(201).json({message: 'this is the register route'})
}

module.exports = {
    registerUser,
    loginUser
}