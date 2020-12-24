const { Router } = require('express')
const router = Router()

const { registerCustomer, registerSeller } = require('../controllers/auth')

router.post('/customer', registerCustomer)
router.post('/seller', registerSeller)

module.exports = router
