const { Router } = require('express')

//ambil object yg ada di controller
const { createdItem, getAllItems, getDetailItem, updatePutItem, updatePatchItem, deleteItem } = require('../controllers/items')
const router = Router()

const tokenAuth = require('../middlewares/auth')
const uploads = require('../helpers/upload')

//link ini akan digabungkan di index /items dan memanggil controller seuai link
router.get('/', getAllItems)
router.get('/detail/:id', getDetailItem)
router.post('/', tokenAuth, uploads, createdItem)
router.patch('/patch/update/:id', tokenAuth, uploads, updatePatchItem)
router.put('/put/update/:id', tokenAuth, uploads, updatePutItem)
router.delete('/delete/:id', tokenAuth, deleteItem)

module.exports = router