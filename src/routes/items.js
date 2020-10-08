const { Router } = require('express')

//ambil object yg ada di controller
const { createdItem, getAllItems, getDetailItem, updatePutItem, updatePatchItem, deleteItem } = require('../controllers/items')
const upload = require('../helpers/upload')
const router = Router()
const tokenAuth = require('../middlewares/auth')


//link ini akan digabungkan di index /items dan memanggil controller seuai link
router.get('/', getAllItems)
router.get('/detail/:id', getDetailItem)
router.post('/', upload.single('picture'), tokenAuth, createdItem)
router.patch('/patch/update/:id', upload.single('picture'), tokenAuth, updatePatchItem)
router.put('/put/update/:id', upload.single('picture'), tokenAuth, updatePutItem)
router.delete('/delete/:id', tokenAuth, deleteItem)

module.exports = router