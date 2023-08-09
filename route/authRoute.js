const router = require('express').Router()
const authController = require('./../controller/auhtController')


router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router