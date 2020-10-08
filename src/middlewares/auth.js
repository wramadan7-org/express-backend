require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const response = require('../helpers/respons')

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.slice(7, authorization.length)
        // const payload = jwtDecode(token, { payload: true })

        try {
            jwt.verify(token, process.env.APP_KEY, (err, decode) => {
                if (err) {
                    return response(res, 'Not verify', '', false)
                } else {
                    //decode berisi payload, ambil payload dan masukkan ke dalam req.user
                    req.user = decode
                    // console.log(req.user)
                    next()
                }
            })
        } catch (err) {
            return response(res, `${err}`, '', false)
        }
    } else {
        return response(res, 'Forbidden access', '', false)
    }
}