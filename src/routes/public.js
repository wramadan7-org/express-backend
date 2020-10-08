const { Router } = require('express')
const { getAllItems, getDetailItem } = require('../controllers/items')
const { readAllCategory, readCategoryId, readAllCategoryJoin } = require('../controllers/category')
const router = Router()

router.get('/items', getAllItems)
router.get('/items/:id', getDetailItem)
router.get('/category', readAllCategory)
router.get('/category/:id', readCategoryId)
router.get('/category/detail/:id', readAllCategoryJoin)

module.exports = router