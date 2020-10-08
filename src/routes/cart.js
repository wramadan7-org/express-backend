const { Router } = require('express')

const { createCart, readCart, deleteCart } = require('../controllers/cart')

const router = Router()

router.post('/', createCart)
router.get('/', readCart)
router.delete('/:id', deleteCart)

module.exports = router