const express = require('express')
const router = express.Router()
const User = require('./../models/user.model')
const Tuit = require('./../models/tuit.model')

//GET ALL TUITS
router.get('/tuits', (req, res, next) => {

})

module.exports = router