const db = require('../helpers/db')

const tableTransaction = 'transactions'
const tableUser = 'users'
const tableCart = 'carts'

module.exports = {
    getTransactionModel: (id, callback) => {
        let sql = `SELECT * FROM ${tableTransaction}`
        db.query(sql, (err, result, _field) => {
            if (result) {
                callback(result)
            } else {
                callback(err)
            }
        })
    }
}