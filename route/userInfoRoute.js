const router = require('express').Router()
const userInfoContoller = require('./../controller/userProfileController')

router.get('/', userInfoContoller.infoUser)


module.exports = router