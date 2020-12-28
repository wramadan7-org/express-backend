/* eslint-disable node/handle-callback-err */
/* eslint-disable no-unused-vars */
const db = require('../helpers/db')
const tableUsers = 'users'
const tableRole = 'user_roles'
const tableProfile = 'user_image'
const tableAddress = 'user_address'

module.exports = {
  getAllUserModel: (callback) => {
    const sql = `SELECT ${tableUsers}.id_user, ${tableRole}.role, ${tableUsers}.name, ${tableUsers}.email, ${tableUsers}.password, ${tableUsers}.phone, ${tableUsers}.gender, ${tableUsers}.date, ${tableUsers}.created_at, ${tableUsers}.updated_at FROM ${tableRole} INNER JOIN ${tableUsers} ON ${tableRole}.id_role = ${tableUsers}.id_role ORDER BY id_user DESC`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      // console.log(sql)
      callback(result)
    })
  },

  getUserModel: (id, callback) => {
    const sql = `SELECT ${tableUsers}.id_user, ${tableRole}.role, ${tableUsers}.name, ${tableUsers}.email, ${tableUsers}.password, ${tableUsers}.phone, ${tableUsers}.gender, ${tableUsers}.date, ${tableUsers}.image AS image, ${tableUsers}.created_at, ${tableUsers}.updated_at FROM ${tableRole} INNER JOIN ${tableUsers} ON ${tableRole}.id_role = ${tableUsers}.id_role WHERE ${tableUsers}.id_user = ${id}`
    db.query(sql, (err, result, _field) => {
      callback(result)
    })
  },

  getUserByIdModel: (id, callback) => {
    const sql = `SELECT * FROM ${tableUsers} WHERE id_user = ${id}`
    // eslint-disable-next-line no-unused-vars
    db.query(sql, (err, result, _field) => {
      if (result.length) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  updatePutUserModel: (arr, callback) => {
    const sql = `UPDATE ${tableUsers} SET 
        name = '${arr[1]}', email = '${arr[2]}', phone = '${arr[3]}', gender = '${arr[4]}', date = '${arr[5]}', image = '${arr[6]}' 
        WHERE id_user = ${arr[0]}`
    db.query(sql, (err, result, _field) => {
      if (result.affectedRows > 0) {
        const sql = `SELECT * FROM ${tableUsers} WHERE id_user = ${arr[0]}`
        db.query(sql, (err, result, _field) => {
          callback(result[0])
        })
      } else {
        callback(err)
      }
    })
  },

  updatePatchUserModel: (arr, callback) => {
    const sql = `SELECT * FROM ${tableUsers} WHERE id_user = ${arr[0]}`
    db.query(sql, (err, result, _field) => {
      if (result.length) {
        const sql = `UPDATE ${tableUsers} SET 
                name = '${arr[1]}', email = '${arr[2]}', password = '${arr[3]}', phone = '${arr[4]}', gender = '${arr[5]}', date = '${arr[6]}' 
                WHERE id_user = ${arr[0]}`
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
  },

  updatePatchUserPhotoModel: (arr, callback) => {
    const sql = `UPDATE ${tableUsers} SET image = '${arr[1]}', name = '${arr[2]}' WHERE id_user = ${arr[0]}`
    db.query(sql, (err, result, _field) => {
      if (result) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  updatePatchByUserModel: (arr, callback) => {
    const sql = `SELECT * FROM ${tableUsers} WHERE id_user = ${arr[0]}`
    db.query(sql, (err, result, _field) => {
      if (result.length) {
        const sql = `UPDATE ${tableUsers} SET name = '${arr[1]}', email = '${arr[2]}', date = '${arr[3]}', image = '${arr[4]}', gender = '${arr[5]}', phone = '${arr[6]}' WHERE id_user = ${arr[0]}`
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
  },

  updatePatchByUserMobileModel: (arr, callback) => {
    // const sql = `SELECT * FROM ${tableUsers} WHERE id_user = ${arr[0]}`
    // db.query(sql, (err, result, _field) => {
    //   if (result.length) {
    const sql = `UPDATE ${tableUsers} SET name = '${arr[1]}', date = ${arr[2]}, email = '${arr[3]}', gender = '${arr[4]}', phone = '${arr[5]}', image = '${arr[6]}' WHERE id_user = ${arr[0]}`
    db.query(sql, (err, result, _field) => {
      if (result) {
        callback(result)
      } else {
        callback(err)
      }
    })
    // } else {
    //   callback(err)
    // }
    // })
  },

  createdUserModel: (arr, callback) => {
    const sql = `INSERT INTO ${tableUsers} (id_role, name, email, password, phone, gender, date) VALUES (${arr[0]}, '${arr[1]}', '${arr[2]}', '${arr[3]}', '${arr[4]}', '${arr[5]}', '${arr[6]}' )`
    db.query(sql, (err, result, _field) => {
      if (result.affectedRows > 0) {
        const resId = result.insertId
        const sql = `INSERT INTO ${tableProfile} (id_user, image) VALUES (${resId}, '${arr[7]}')`
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
  },

  addAddressModel: (arr, callback) => {
    const sql = `INSERT INTO ${tableAddress} (id_user, home_address, recepients_name, recepients_number, address, postal_code, city) 
        VALUES (${arr[0]}, '${arr[1]}', '${arr[2]}', '${arr[3]}', '${arr[4]}', ${arr[5]}, '${arr[6]}')`
    db.query(sql, (err, result, _field) => {
      // console.log(result)
      if (result) {
        callback(result)
      } else {
        callback(result)
      }
    })
  },

  getAddressModel: (id, callback) => {
    const sql = `SELECT * FROM ${tableAddress} WHERE id_user = ${id}`
    db.query(sql, (err, result, _field) => {
      if (result) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  updatePutAddressModel: (arr, callback) => {
    const sql = `SELECT * FROM ${tableAddress} WHERE id_user = ${arr[0]} AND id_address = ${arr[7]}`
    db.query(sql, (err, result, _field) => {
      // console.log(result)
      if (result.length) {
        const sql = `UPDATE ${tableAddress} SET id_user = ${arr[0]}, home_address = '${arr[1]}', recepients_name = '${arr[2]}', recepients_number = '${arr[3]}', address = '${arr[4]}', postal_code = ${arr[5]}, city = '${arr[6]}'
                WHERE id_address = ${arr[7]} AND id_user = ${arr[0]}`
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
  },

  deleteAddressModel: (arr, callback) => {
    const sql = `SELECT * FROM ${tableAddress} WHERE id_address = ${arr[0]} AND id_user = ${arr[1]}`
    db.query(sql, (err, result, _field) => {
      // console.log(result)
      if (result.length) {
        const sql = `DELETE FROM ${tableAddress} WHERE id_address = ${arr[0]} AND id_user = ${arr[1]}`
        db.query(sql, (err, result, _field) => {
          callback(result)
        })
      } else {
        callback(err)
      }
    })
  },

  changePasswordModel: (arr, callback) => {
    const sql = `UPDATE ${tableUsers} SET password = '${arr[1]}' WHERE id_user = ${arr[0]}`
    db.query(sql, (err, result, _field) => {
      if (result) {
        callback(result)
      } else {
        callback(err)
      }
    })
  }
}
