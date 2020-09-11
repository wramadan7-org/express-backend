const db = require('../helpers/db.js')
const qs = require('querystring')

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
				const pageInfo = {
					count: 0,
					pages: 0,
					currentPage: arr[0],
					limitPage: arr[1],
					nextLink: null,
					prevLink: null
				}
				if (result.length) {
					const sql = `SELECT COUNT (*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`
					// eslint-disable-next-line no-unused-vars
					// console.log(sql)
					db.query(sql, (err, result, field) => {
					// callback(result)
					const {count} = result[0]
						// console.log(count)
						pageInfo.count = count
						pageInfo.pages = Math.ceil(count / arr[1])

						const {pages, currentPage} = pageInfo

						if (currentPage < pages) {
							pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({...req.query,...{page: page+1}})}`
						}
						if (currentPage > 1) {
							pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({...req.query,...{page: page-1}})}`
						}

						console.log(result)

					})
				}
				
			} else {
				console.log('Data not found')
			}
		})
	},

	deleteItemModel: (id, callback) => {
		let sql = `SELECT * FROM ${table} WHERE id = ${id}`
		// eslint-disable-next-line no-unused-vars
		db.query(sql, (err, result, field) => {
			if (result.length) {
				let sql = `DELETE FROM ${table} WHERE id = ${id}`
				// eslint-disable-next-line no-unused-vars
				db.query(sql, (err, result, field) => {
					callback(result)
				})
			} else {
				console.log('Data not found')
			}
		})
	}
}