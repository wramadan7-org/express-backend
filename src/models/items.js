const db = require('../helpers/db.js')
// const qs = require('querystring')

const table = 'items'

module.exports = {

	createItemModel: (arr, callback) => {
		let sql = `INSERT INTO items (name, price, description) VALUES ('${arr[0]}', ${arr[1]}, '${arr[2]}')`
		db.query(sql, (err, result, field) => {
			if (!err) {
				callback(result)
			} else {
				console.log('Input fail', err)
			}
		})
	},

	getItemModel: (id, callback) => {
		let sql = `SELECT * FROM ${table} WHERE id = ${id}`
		// eslint-disable-next-line no-unused-vars
		db.query(sql, (err, result, field) => {
			if (!err) {
				callback(result)
			}
		})
	},

	getAllItemModel: (arr, callback) => {
		const sql = `SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' LIMIT ${arr[2]} OFFSET ${arr[3]}`
		// console.log(sql)
		// eslint-disable-next-line no-unused-vars
		db.query(sql, (err, result, field) => {
			if (!err) {
				callback(result)
				// if (result.length) {
				// 	const sql = `SELECT COUNT (*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`
				// 	// eslint-disable-next-line no-unused-vars
				// 	// console.log(sql)
				// 	// eslint-disable-next-line no-unused-vars
				// 	db.query(sql, (err, result, field) => {
				// 	// callback(result)

				// 	})
				// }
				
			} else {
				console.log('Server error')
			}
		})
	},

	updatePutItemModel: (arr, callback) => {

		let sql = `UPDATE ${table} SET name = '${arr[0]}', price = ${arr[1]}, description = '${arr[2]}' WHERE id = ${arr[3]}`
		// eslint-disable-next-line no-unused-vars
		db.query(sql, (err, result, field) => {
			// console.log(result) //berisi affected rows
			if (result.affectedRows > 0) {
				let sql = `SELECT * FROM ${table} WHERE id = ${arr[3]}`
				db.query(sql, (err, result, field) => {
					if (!err) {
						callback(result)
					} else {
						callback(err) //err ini berisi null
					}
				})
			} else {
				callback(err)
			}
		})
	},

	updatePatchItemModel: (arr, callback) => {


		let sql = `UPDATE items SET ${arr[0]} WHERE id = ${arr[1]}`
		db.query(sql, (err, result, fields) => {
			if (result.affectedRows > 0) {
				let sql = `SELECT * FROM items WHERE id = ${arr[1]}`
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
		let sql = `DELETE FROM ${table} WHERE id = ${id}`
		// eslint-disable-next-line no-unused-vars
		db.query(sql, (err, result, field) => {
			if (!err) {
				callback()
			}
		})
		
	}
}