/* eslint-disable camelcase */
// const response = require('./respons')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/uploads')
  },

  filename: (req, file, cb) => {
    const { id_user } = req.user.user
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1] // ambil type file (jpg/png)
    //  console.log('sassas', [file.originalname.split('.').length])
    if (ext === 'jpg' || ext === 'png') {
      const filename = new Date().getTime().toString().concat(id_user).concat('.').concat(ext)
      cb(null, filename)
    } else {
      cb(new Error(), '')
    }
  }
})

module.exports = multer({ storage }).single('picture')
