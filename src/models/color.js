const db = require('../helpers/db')
const tableColor = 'product_colors'

module.exports = {
    addColorModel: (color, callback) => {
        let sql = `INSERT INTO ${tableColor} (color) VALUES ('${color}')`
        // eslint-disable-next-line no-unused-vars
        db.query(sql, (err, result, _field) => {
            callback(result)
        })
    },

    getColorModel: (callback) => {
        let sql = `SELECT * FROM ${tableColor} ORDER BY id_color DESC`
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
        let sql = `SELECT * FROM ${tableColor} WHERE id_color = ${id_color}`
        db.query(sql, (err, result, _field) => {
            if (result) {
                let sql = `DELETE FROM ${tableColor} WHERE id_color = ${id_color}`
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