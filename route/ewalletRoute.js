const router = require('express').Router()
const ewalletController = require('../controller/ewalletController')

router.get('/balance',ewalletController.getBalance)
router.patch('/transfer',ewalletController.transfer)
router.patch('/withdraw',ewalletController.withdraw)


module.exports = router