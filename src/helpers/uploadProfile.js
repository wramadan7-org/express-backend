const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let originalName = file.originalname
        let type = originalName.split('.')
        if (type[1] == 'jpg' || type[1] == 'png') {
            cb(null, 'assets/profile/')
        } else {
            cb(new Error, '')
        }
    }
})

module.exports = multer({ storage })