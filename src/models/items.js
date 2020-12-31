/* eslint-disable node/handle-callback-err */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
const db = require('../helpers/db.js')
// const qs = require('querystring')

const table = 'items'
const table2 = 'category'
const table3 = 'product_colors'
const table4 = 'product_conditions'

module.exports = {

  createItemModel: (arr, callback) => {
    const sql = `INSERT INTO items (name, price, description, id_category, picture, id_color, id_condition) VALUES ('${arr[0]}', ${arr[1]}, '${arr[2]}', ${arr[3]}, '${arr[4]}', ${arr[5]}, ${arr[6]})`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, field) => {
      // console.log(result)
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  getItemModel: (id, callback) => {
    const sql = `SELECT ${table}.id_item, ${table2}.name_category AS category, ${table}.name AS name, ${table}.price, ${table3}.color, ${table4}.condition, ${table}.description, ${table}.picture, ${table}.created_at, ${table}.updated_at FROM (((${table} 
					INNER JOIN ${table2} ON ${table}.id_category = ${table2}.id_category)
					INNER JOIN ${table3} ON ${table}.id_color = ${table3}.id_color)
					INNER JOIN ${table4} ON ${table}.id_condition = ${table4}.id_condition)
					WHERE ${table}.id_item = ${id}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, field) => {
      // console.log(result) //data berdasarkan id
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  getAllItemModel: (arr, callback) => {
    // console.log(sql)

    const sql = `SELECT COUNT (*) AS count FROM ${table}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, field) => {
      // result berisi object count yang value hasil jumlah semua data di db
      if (!err) {
        if (result.length) {
          const count = result[0]
          // const sql = `SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' LIMIT ${arr[2]} OFFSET ${arr[3]}`
          const sql = `SELECT ${table}.id_item, ${table2}.name_category AS category, ${table}.name AS name, ${table}.price, ${table3}.color, ${table4}.condition, ${table}.description, ${table}.picture, ${table}.created_at, ${table}.updated_at FROM (((${table} 
							INNER JOIN ${table2} ON ${table}.id_category = ${table2}.id_category)
							INNER JOIN ${table3} ON ${table}.id_color = ${table3}.id_color)
							INNER JOIN ${table4} ON ${table}.id_condition = ${table4}.id_condition)
							WHERE ${arr[0]} LIKE '%${arr[1]}%' LIMIT ${arr[2]} OFFSET ${arr[3]}`
          db.query(sql, (err, result, _field) => {
            if (!err) {
              // callback berisi 2 param
              callback(result, count)
            } else {
              callback(err)
            }
          })
        } else {
          callback(err)
        }
      } else {
        callback(err)
      }
    })
  },

  updatePitItemWithoutPicture: (arr, callback) => {
    const sql = `UPDATE ${table} SET
		name = '${arr[0]}', price = ${arr[1]}, description = '${arr[2]}', id_category = ${arr[4]}, updated_at = '${arr[5]}', id_color = ${arr[6]}, id_condition = ${arr[7]} 
		WHERE id_item = ${arr[3]}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, field) => {
      // console.log(result) //berisi affected rows
      if (result.affectedRows > 0) {
        const sql = `SELECT * FROM ${table} WHERE id_item = ${arr[3]}`
        // eslint-disable-next-line no-unused-vars
        db.query(sql, (err, result, field) => {
          if (!err) {
            callback(result)
          } else {
            callback(err) // err ini berisi null
          }
        })
      } else {
        callback(err)
      }
    })
  },

  updatePutItemModel: (arr, callback) => {
    const sql = `UPDATE ${table} SET
		name = '${arr[0]}', price = ${arr[1]}, description = '${arr[2]}', id_category = ${arr[4]}, picture = '${arr[5]}', updated_at = '${arr[6]}', id_color = ${arr[7]}, id_condition = ${arr[8]} 
		WHERE id_item = ${arr[3]}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, field) => {
      console.log(result) // berisi affected rows
      if (result.affectedRows > 0) {
        const sql = `SELECT * FROM ${table} WHERE id_item = ${arr[3]}`
        // eslint-disable-next-line no-unused-vars
        db.query(sql, (err, result, field) => {
          if (!err) {
            callback(result)
          } else {
            callback(err) // err ini berisi null
          }
        })
      } else {
        callback(err)
      }
    })
  },

  updatePatchItemModel: (arr, callback) => {
    const sql = `UPDATE items SET ${arr[0]} WHERE id_item = ${arr[1]}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, fields) => {
      if (result.affectedRows > 0) {
        const sql = `SELECT * FROM items WHERE id_item = ${arr[1]}`
        // eslint-disable-next-line no-unused-vars
        db.query(sql, (err, result, fields) => {
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
  },

  deleteItemModel: (id, callback) => {
    const sql = `SELECT * FROM ${table} WHERE id_item = ${id}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      if (result.length) {
        const sql = `DELETE FROM ${table} WHERE id_item = ${id}`
        // eslint-disable-next-line no-unused-vars
        db.query(sql, (err, result, field) => {
          callback(result)
        })
      } else {
        callback(err)
      }
    })
  }
}
