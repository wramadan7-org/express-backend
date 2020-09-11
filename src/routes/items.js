const { Router } = require('express')

//ambil object yg ada di controller
const {createdItem, getAllItems, getDetailItem, updatePutItem, updatePatchItem, deleteItem} = require('../controllers/items')

const router = Router()

//link ini akan digabungkan di index /items dan memanggil controller seuai link
router.get('/', getAllItems)
router.get('/detail/:id', getDetailItem)
router.post('/', createdItem)
router.patch('/patch/update/:id', updatePatchItem)
router.put('/put/update/:id', updatePutItem)
router.delete('/delete/:id', deleteItem)

module.exports = router