const { Router } = require('express')
const router = Router()

const uploadProfile = require('../../helpers/uploadProfile')

const { createCart, readCart, deleteCart } = require('../../controllers/cart')

const {
  getUser,
  updatePutByUser,
  updatePatchByUser,
  updatePatchUserMobile,
  getAddress,
  addAddress,
  updatePutAddress,
  deleteAddress,
  updatePatchPhotoProfile,
  changePassword,
  addressByParams
} = require('../../controllers/user')
const { getTransaction } = require('../../controllers/transaction')

router.get('/cart', readCart)
router.post('/cart', createCart)
router.delete('/cart/:id', deleteCart)

router.patch('/profile/photo', uploadProfile, updatePatchPhotoProfile)
router.get('/profile', getUser)
router.put('/profile', uploadProfile, updatePutByUser)
router.patch('/profile', uploadProfile, updatePatchByUser)

router.get('/address', getAddress)
router.get('/address/:id', addressByParams)
router.post('/address', addAddress)
router.put('/address/:id', updatePutAddress)
router.delete('/address/:id', deleteAddress)

router.get('/transaction', getTransaction)
router.patch('/changePassword', changePassword)

// mobile
router.patch('/mobile/profile', uploadProfile, updatePatchUserMobile)

module.exports = router
