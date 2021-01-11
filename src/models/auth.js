/* eslint-disable node/no-callback-literal */
const db = require('../helpers/db')

module.exports = {
  loginModel: (arr, callback) => {
    const sql = `SELECT * FROM users WHERE email = '${arr[0]}'`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      if (result.length > 0) {
        callback({ ...result[0] })
      } else {
        callback(err)
      }
    })
  },

  registerCustomerModel: (arr, callback) => {
    const sql = `SELECT * FROM users WHERE email = '${arr[2]}'`
    db.query(sql, (err, result, field) => {
      console.log(result.length)
      if (result <= 0) {
        const sql = `INSERT INTO users (id_role, name, email, password, phone, date, image) VALUES (${arr[0]}, '${arr[1]}', '${arr[2]}', '${arr[3]}', '', '2000-01-01', '')`
        db.query(sql, (err, result, _field) => {
          // console.log(result)
          if (result.affectedRows > 0) {
            callback(result)
          } else {
            callback(err)
          }
        })
      } else {
        callback(err)
      }
    })
  },

  registerSellerModel: (arr, callback) => {
    const sql = `SELECT * FROM users WHERE email = '${arr[2]}'`
    db.query(sql, (err, result, field) => {
      // console.log(result.length)
      if (result <= 0) {
        const sql = `INSERT INTO users (id_role, name, email, password, phone, gender, date) VALUES (${arr[0]}, '${arr[1]}', '${arr[2]}', '${arr[3]}', '${arr[4]}', '${arr[5]}', ${arr[6]})`
        db.query(sql, (err, result, _field) => {
          // console.log(result)
          if (result.affectedRows > 0) {
            callback(result)
          } else {
            callback(err)
          }
        })
      } else {
        callback(err)
      }
    })
  }
}
