const { Router } = require('express')

const router = Router()
const { addColor, getColor, deleteColor } = require('../controllers/color')

router.post('/', addColor)
router.get('/', getColor)
router.delete('/:id', deleteColor)

module.exports = router