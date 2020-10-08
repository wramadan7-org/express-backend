const { Router } = require('express')
const upload = require('../helpers/upload')

const { createdCategory, readAllCategory, readCategoryId, readAllCategoryJoin, updatePatchCategory, updatePutCategory, deleteCategory } = require('../controllers/category')

const router = Router()

const tokenAuth = require('../middlewares/auth')

router.post('/', upload.single('picture'), tokenAuth, createdCategory)
router.get('/', readAllCategory)
router.get('/:id', readCategoryId)
router.get('/detail/:id', readAllCategoryJoin)
router.patch('/patch/:id', upload.single('picture'), tokenAuth, updatePatchCategory)
router.put('/put/:id', upload.single('picture'), tokenAuth, updatePutCategory)
router.delete('/:id', tokenAuth, deleteCategory)

module.exports = router