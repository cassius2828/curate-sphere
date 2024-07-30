const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')

// Register user
router.post('/register', authCtrl.registerUser);

// Login user
router.post('/login', authCtrl.loginUser);

module.exports = router;