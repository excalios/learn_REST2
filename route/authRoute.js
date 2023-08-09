const router = require('express').Router()
const authController = require('./../controller/auhtController')


router.post('/register', authController.register)

module.exports = router