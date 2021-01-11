const db = require('../helpers/db')

const tableHistory = 'history'

module.exports = {
  addHistory: (arr, callback) => {
    console.log('array', arr)
    const sql = `INSERT INTO ${tableHistory} (id_item, id_user, id_address, qty, total, nota) VALUES ${arr}`
    db.query(sql, (err, result, _field) => {
      console.log(err)
      if (result.affectedRows > 0) {
        console.log('result Model', result)
        callback(result)
      } else {
        callback(err)
      }
    })
  }
}
