/* eslint-disable no-unused-vars */
const db = require('../helpers/db')
const table1 = 'carts'
const table2 = 'users'
const table3 = 'items'

module.exports = {
	createCartModel: (arr, callback) => {
		let sql = `SELECT * FROM ${table3} WHERE id_item = ${arr[1]}`
		db.query(sql, (err, result, _field) => {
			if (result.length) {
				let sql = `INSERT INTO ${table1} (id_user, id_item, qty) VALUES (${arr[0]}, ${arr[1]}, ${arr[2]})`
				// eslint-disable-next-line no-unused-vars
				db.query(sql, (err, result, field) => {
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

	//var.map(objct, index, array) => {}

	readCartModel: (id, callback) => {
		let sql = `SELECT SUM(${table3}.price) AS total FROM ((${table1} INNER JOIN ${table2} ON ${table1}.id_user = ${table2}.id_user) INNER JOIN ${table3} ON ${table1}.id_item = ${table3}.id_item) WHERE ${table1}.id_user = ${id}`
		db.query(sql, (err, result, _field) => {
			if (result.length) {
				const total = result[0]
				let sql = `SELECT ${table1}.id_cart AS id, ${table2}.id_user, ${table2}.name AS name, ${table3}.name AS item, ${table1}.qty AS qty, ${table3}.price AS price FROM ((${table1} INNER JOIN ${table2} ON ${table1}.id_user = ${table2}.id_user) INNER JOIN ${table3} ON ${table1}.id_item = ${table3}.id_item) WHERE ${table1}.id_user = ${id}`
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
		let sql = `SELECT * FROM ${table1} WHERE id_cart = ${arr[0]} AND id_user = ${arr[1]}`
		db.query(sql, (err, result, _field) => {
			if (result.length) {
				let sql = `DELETE FROM ${table1} WHERE id_cart = ${arr[0]}`
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