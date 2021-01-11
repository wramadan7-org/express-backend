const db = require('../helpers/db')

const tableTransaction = 'transactions'
const tableUser = 'users'
const tableCart = 'carts'
const tableAddress = 'user_address'
const tableHistory = 'history'
const tableItem = 'items'

module.exports = {
  addTransactionModel: (arr, callback) => {
    //  console.log('array', arr)
    const sql = `INSERT INTO ${tableTransaction} (nota, id_address, total) VALUES ('${arr[0]}', ${arr[1]}, ${arr[2]})`
    db.query(sql, (err, result, _field) => {
      console.log(err)
      if (result.affectedRows > 0) {
      //   console.log('result Model', result)
        callback(result)
      } else {
        callback(err)
      }
    })
  },
  getTransactionModel: (id, callback) => {
    const sql = `SELECT * FROM ${tableCart} WHERE id_user = ${id}`
    db.query(sql, (err, result, _field) => {
      if (result) {
        callback(result)
      } else {
        callback(err)
      }
    })
  }
}
