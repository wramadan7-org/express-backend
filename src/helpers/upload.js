// const response = require('./respons')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let originalName = file.originalname
        let type = originalName.split('.')
        if (type[1] == 'jpg' || type[1] == 'png') {
            cb(null, 'assets/uploads/')
        } else {
            cb(new Error, '')
        }
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


module.exports = multer({ storage })