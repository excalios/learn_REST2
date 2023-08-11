const router = require('express').Router()
const ewalletController = require('./../controller/ewallet')
const authMiddleware = require('./../middleware/authenticated')


router.get('/balance',ewalletController.getBalance)
router.patch('/transfer',ewalletController.transfer)


module.exports = router