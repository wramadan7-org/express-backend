/* eslint-disable no-unused-vars */
const db = require('../helpers/db.js')
const table = 'category'
const table2 = 'items'

module.exports = {
  createdCategoryModel: (arr, callback) => {
    const sql = `INSERT INTO ${table} (name_category, picture) VALUES ('${arr[0]}', '${arr[1]}')`

    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      if (result.affectedRows > 0) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  readAllCategoryModel: (arr, callback) => {
    const sql = `SELECT COUNT (*) AS count FROM ${table}`
    db.query(sql, (err, result, _field) => {
      if (!err) {
        if (result.length) {
          const count = result[0]
          const sql = `SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' LIMIT ${arr[2]} OFFSET ${arr[3]}`
          db.query(sql, (err, result, _field) => {
            if (!err) {
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

  readCategoryIdModel: (id, callback) => {
    const sql = `SELECT * FROM ${table} WHERE id_category = ${id}`

    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  readAllCategoryJoinModel: (arr, callback) => {
    const sql = `SELECT  ${table}.id_category, ${table2}.id_item, ${table2}.name, ${table}.name_category FROM ${table2} INNER JOIN ${table} ON ${table2}.id_category = ${table}.id_category WHERE ${table}.id_category = ${arr[2]}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (_err, result, _field) => {
      const res = result.forEach(element => {
        // console.log(element.name)
      })
      callback(result)
      // cara sulit
      // melihat semua isi category yg berdasarkan id_category
      // let filter = result.filter((txt) => {
      // return txt.name.toLowerCase().indexOf(arr[1].toLowerCase()) > -1
      // })
      // jika aray index 1 ada isinya maka tampilkan filter, jika tidak tampilkan result
      // callback(arr[1] ? filter : result)
    })
  },

  updatePatchCategoryModel: (arr, callback) => {
    const sql = `SELECT * FROM ${table} WHERE id_category = ${arr[1]}`

    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      // console.log(result.length)
      if (result.length) {
        const sql = `UPDATE ${table} SET name_category = '${arr[0]}', picture = '${arr[2]}', updated_at = '${arr[3]}' WHERE id_category = ${arr[1]}`

        // eslint-disable-next-line no-unused-vars
        db.query(sql, (err, result, _field) => {
          if (!err) {
            // console.log(result)
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

  updatePutCategoryModel: (arr, callback) => {
    const sql = `SELECT * FROM ${table} WHERE id_category = ${arr[1]}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      // console.log(result)
      if (result) {
        const sql = `UPDATE ${table} SET name_category = '${arr[0]}', picture = '${arr[2]}', updated_at = '${arr[3]}' WHERE id_category = ${arr[1]}`

        // eslint-disable-next-line no-unused-vars
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

  deleteCategoryModel: (id, callback) => {
    const sql = `SELECT * FROM ${table} WHERE id_category = ${id}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      if (result.length) {
        const sql = `DELETE FROM ${table} WHERE id_category = ${id}`

        // eslint-disable-next-line no-unused-vars
        db.query(sql, (_err, result, _field) => {
          callback(result)
        })
      } else {
        callback(err)
      }
    })
  }
}
