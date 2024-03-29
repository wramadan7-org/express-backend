const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/profile')
  },
  filename: (req, file, cb) => {
    const { name } = req.user.user
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1] // ambil type file (jpg/png)
    //  console.log('sassas', [file.originalname.split('.').length])
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
      const filename = new Date().getTime().toString().concat(name.split(' ').join('-')).concat('.').concat(ext)
      cb(null, filename)
    } else {
      cb(new Error(), '')
    }
  }
})

module.exports = multer({ storage }).single('photo')
