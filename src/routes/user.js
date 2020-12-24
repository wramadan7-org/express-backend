const { Router } = require('express')
const uploadProfile = require('../helpers/uploadProfile')

const {
  createdUser, getAllUser, getUserById, updatePatch, updatePut, addAddress,
  getAddress, updatePutAddress, deleteAddress, changePassword, updatePatchUserMobile
} = require('../controllers/user')

const router = Router()
// const tokenAuth = require('../middlewares/auth')

router.get('/', getAllUser)
router.get('/detail/:id', getUserById)
router.post('/', uploadProfile, createdUser)
router.patch('/patch/:id', updatePatch)
router.put('/put/:id', updatePut)
router.post('/address', addAddress)
router.get('/address', getAddress)
router.put('/address/:id', updatePutAddress)
router.delete('/address/:id', deleteAddress)

router.patch('/personal/update', updatePatchUserMobile)
router.patch('/changePassword', changePassword)

module.exports = router
