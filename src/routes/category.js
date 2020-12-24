const { Router } = require('express')
const uploads = require('../helpers/upload')

const { createdCategory, readAllCategory, readCategoryId, readAllCategoryJoin, updatePatchCategory, updatePutCategory, deleteCategory } = require('../controllers/category')

const router = Router()

const tokenAuth = require('../middlewares/auth')

router.post('/', tokenAuth, uploads, createdCategory)
router.get('/', readAllCategory)
router.get('/:id', readCategoryId)
router.get('/detail/:id', readAllCategoryJoin)
router.patch('/patch/:id', tokenAuth, uploads, updatePatchCategory)
router.put('/put/:id', tokenAuth, uploads, updatePutCategory)
router.delete('/:id', tokenAuth, deleteCategory)

module.exports = router
