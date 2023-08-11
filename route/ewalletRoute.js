const router = require('express').Router()
const ewalletController = require('../controller/ewalletController')
const authMiddleware = require('./../middleware/authenticated')


router.get('/balance',ewalletController.getBalance)
router.patch('/transfer',ewalletController.transfer)
router.patch('/withdraw',ewalletController.withdraw)


module.exports = router