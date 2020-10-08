const jwtDecode = require('jwt-decode')

module.exports = {
    payload: (authorization) => {
        if (authorization && authorization.startsWith('Bearer ')) {
            let token = authorization.slice(7, authorization.length)
            token = jwtDecode(token, { payload: true })
            return token
        }
    }
}