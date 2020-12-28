/* eslint-disable camelcase */
/* eslint-disable node/handle-callback-err */
const db = require('../helpers/db')
const tableColor = 'product_colors'

module.exports = {
  addColorModel: (color, callback) => {
    const sql = `INSERT INTO ${tableColor} (color) VALUES ('${color}')`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      callback(result)
    })
  },

  getColorModel: (callback) => {
    const sql = `SELECT * FROM ${tableColor} ORDER BY id_color DESC`
    // eslint-disable-next-line no-undef
    db.query(sql, (err, result, _field) => {
      if (result) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  deleteColorModel: (id_color, callback) => {
    const sql = `SELECT * FROM ${tableColor} WHERE id_color = ${id_color}`
    db.query(sql, (err, result, _field) => {
      if (result) {
        const sql = `DELETE FROM ${tableColor} WHERE id_color = ${id_color}`
        db.query(sql, (err, result, _field) => {
          if (result) {
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
