/* eslint-disable node/handle-callback-err */
/* eslint-disable no-unused-vars */
const db = require('../helpers/db')
const table1 = 'carts'
const table2 = 'users'
const table3 = 'items'
const table4 = 'product_colors'

module.exports = {
  createCartModel: (arr, callback) => {
    const sql = `INSERT INTO ${table1} (id_user, id_item, qty) VALUES (${arr[0]}, ${arr[1]}, ${arr[2]})`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, field) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  // var.map(objct, index, array) => {}

  readCartModel: (id, callback) => {
    const sql = `SELECT SUM(${table3}.price * ${table1}.qty) AS total FROM ((${table1} INNER JOIN ${table2} ON ${table1}.id_user = ${table2}.id_user) INNER JOIN ${table3} ON ${table1}.id_item = ${table3}.id_item) WHERE ${table1}.id_user = ${id}`
    db.query(sql, (err, result, _field) => {
      if (result.length) {
        const total = result[0]
        const sql = `SELECT ${table1}.id_cart AS id, ${table2}.id_user, ${table2}.name AS name, ${table3}.name AS item, ${table3}.picture AS picture, ${table1}.qty AS qty, ${table3}.price AS price, ${table4}.color AS color FROM (((${table1} INNER JOIN ${table2} ON ${table1}.id_user = ${table2}.id_user) INNER JOIN ${table3} ON ${table1}.id_item = ${table3}.id_item) INNER JOIN ${table4} ON ${table3}.id_color = ${table4}.id_color) WHERE ${table1}.id_user = ${id} ORDER BY ${table1}.id_cart DESC`
        db.query(sql, (err, result, _field) => {
          if (!err) {
            callback(result, total)
          } else {
            callback(err)
          }
        })
      }
    })
  },

  deleteCartModel: (arr, callback) => {
    const sql = `SELECT * FROM ${table1} WHERE id_cart = ${arr[0]} AND id_user = ${arr[1]}`
    db.query(sql, (err, result, _field) => {
      if (result.length) {
        const sql = `DELETE FROM ${table1} WHERE id_cart = ${arr[0]}`
        db.query(sql, (err, result, _field) => {
          if (!err) {
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
