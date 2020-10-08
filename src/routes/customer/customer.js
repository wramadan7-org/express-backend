const { Router } = require('express')
const router = Router()

const uploadProfile = require('../../helpers/uploadProfile')

const { getAllItems, getDetailItem } = require('../../controllers/items')
const { readAllCategory, readCategoryId, readAllCategoryJoin } = require('../../controllers/category')
const { createCart, readCart, deleteCart } = require('../../controllers/cart')
const { getUser, updatePutByUser, getAddress, addAddress, updatePutAddress, deleteAddress } = require('../../controllers/user')
const { getTransaction } = require('../../controllers/transaction')

router.get('/product', getAllItems)
router.get('/product/:id', getDetailItem)
router.get('/category', readAllCategory)
router.get('/category/:id', readCategoryId)
router.get('/category/detail/:id', readAllCategoryJoin)
router.get('/cart', readCart)
router.post('/cart', createCart)
router.delete('/cart/:id', deleteCart)
router.get('/profile', getUser)
router.put('/profile', uploadProfile.single('image'), updatePutByUser)
router.get('/address', getAddress)
router.post('/address', addAddress)
router.put('/address/:id', updatePutAddress)
router.delete('/address/:id', deleteAddress)
router.get('/transaction', getTransaction)

module.exports = router