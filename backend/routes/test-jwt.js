const express = require('express')
const router = express.Router()
const tokenRouter = require('../controllers/test-jwt')


router.post('/verify-token', tokenRouter.verify)

module.exports = router;