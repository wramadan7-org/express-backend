const { Router } = require('express')
const uploads = require('../helpers/upload')

const { createdCategory, readAllCategory, readCategoryId, readAllCategoryJoin, updatePatchCategory, updatePutCategory, deleteCategory } = require('../controllers/category')

const router = Router()

const tokenAuth = require('../middlewares/auth')

router.post('/', uploads, tokenAuth, createdCategory)
router.get('/', readAllCategory)
router.get('/:id', readCategoryId)
router.get('/detail/:id', readAllCategoryJoin)
router.patch('/patch/:id', uploads, tokenAuth, updatePatchCategory)
router.put('/put/:id', uploads, tokenAuth, updatePutCategory)
router.delete('/:id', tokenAuth, deleteCategory)

module.exports = router