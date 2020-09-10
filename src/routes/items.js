const { Router } = require('express');

const {createdItem, getAllItems, getDetailItem, updatePutItem, updatePatchItem, deleteItem} = require('../controllers/items')

const router = Router()


router.get('/', getAllItems)
router.get('/detail/:id', getDetailItem)
router.post('/', createdItem)
router.patch('/patch/update/:id', updatePatchItem)
router.put('/put/update/:id', updatePutItem)
router.delete('/delete/:id', deleteItem)

module.exports = router