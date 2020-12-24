const { Router } = require('express')
const { login } = require('../controllers/auth')

const router = Router()

router.post('/customer', login)
router.post('/seller', login)

module.exports = router
