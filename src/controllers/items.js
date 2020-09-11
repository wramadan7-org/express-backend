const db = require('../helpers/db') //ambil db
const qs = require('querystring')
const {createItemModel, getItemModel, getAllItemModel, updatePutItemModel, updatePatchItemModel, deleteItemModel} = require('../models/items')

module.exports = {

	getDetailItem: (req, res) => {
		let id = req.params.id

		id = parseInt(id)

		getItemModel(id, result => {
			if (result.length) {
				res.send({
					success: true,
					message: 'Success',
					data: result[0]
				})
			} else {
				res.send({
					success: false,
					message: 'Data not found'
				})
			}
		})

		// console.log(id)

		// let sql = `SELECT * FROM items WHERE id=${id}`
		// db.query(sql, (err, result, fields) => {
		// 	if (!err) {
		// 		res.send({
		// 			success: true,
		// 			message: 'Detail ID',
		// 			data: {
		// 				id: result
		// 			}
		// 		})
		// 	} else {
		// 		res.send({
		// 			success: false,
		// 			message: 'Tidak ditemukan'
		// 		})
		// 	}
		// })
	},

	//Kurang pageInfo
	getAllItems: (req, res) => {

		let {page, limit, search} = req.query

		let searchKey = ''
		let searchValue = ''

		if (typeof search === 'object') {
			searchKey = Object.keys(search)[0]
			searchValue = Object.values(search)[0]
		} else {
			searchKey = 'name'
			searchValue = search||''
			// console.log(search)
		}

		if(!limit) {
			limit = 5
		} else {
			limit = parseInt(limit) 
		}
		if (!page) {
			page = 1
		} else {
			page = parseInt(page)
		}
		//kenapa di parseInt, karena inpuan bersifat string jadi jika ingin mengamil nomor, harus di ganti dgn tipedata number
		const offset = (page-1) * limit

		getAllItemModel([searchKey, searchValue, limit, offset], result  => {
			if (result.length) {
				// const pageInfo = {
				// 	count: 0,
				// 	pages: 0,
				// 	currentPage: page,
				// 	limitPage: limit,
				// 	nextLink: null,
				// 	prevLink: null
				// }
				res.send({
					success: true,
					message: 'Success',
					data: {
						result
						// pageInfo
					}
				})

			} else {
				res.send({
					success: false,
					message: 'Data not found'
				})
			}
		})

		// const sql = `SELECT * FROM items WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
		// // console.log(sql)
		// db.query(sql, (err, result, fields) => { //harus ada 3 parameter/callback
		// 	if(!err) {
		// 		const pageInfo = {
		// 			count: 0,
		// 			pages: 0,
		// 			currentPage: page,
		// 			limitPage: limit,
		// 			nextLink: null,
		// 			prevLink: null
		// 		}
		// 		if (result.length) { //kenapa result.length karena result mengembalikan array
		// 			const sql = `SELECT COUNT (*) AS count FROM items WHERE ${searchKey} LIKE '%${searchValue}%'`
		// 			// console.log(sql)
		// 			db.query(sql, (err, data, fields) => {
		// 				const {count} = data[0]
		// 				// console.log(count)
		// 				pageInfo.count = count
		// 				pageInfo.pages = Math.ceil(count / limit)

		// 				const {pages, currentPage} = pageInfo

		// 				if (currentPage < pages) {
		// 					pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({...req.query,...{page: page+1}})}`
		// 				}
		// 				if (currentPage > 1) {
		// 					pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({...req.query,...{page: page-1}})}`
		// 				}

		// 				res.send({
		// 					success: true,
		// 					message: 'Berhasil',
		// 					data: result,
		// 					pageInfo
		// 				})
		// 			})

					
		// 		} else {
		// 			res.send({
		// 				success: true,
		// 				message: 'Data kosong',
		// 				data: result,
		// 				pageInfo
		// 			})
		// 		}
		// 	} else {
		// 		res.status(500).send({
		// 			success: false,
		// 			message: 'Internal server error'
		// 		})
		// 	}
		// }) //belum
	},

	createdItem: (req, res) => {
		const { name, price, description } = req.body
		if (name && price && description) {
			createItemModel([name, price, description], result => {
				res.status(201).send({
						success: true,
						message: 'Items has benn created',
						data: {
							id: result.id,
							...req.body
						}
					})
			})

			// db.query(`INSERT INTO items (name, price, description) VALUES ('${name}', ${price}, '${description}')`, (err, result, fields) => {
			// 	if (!err) {
			// 		res.status(201).send({
			// 			success: true,
			// 			message: 'Items has benn created',
			// 			data: {
			// 				id: result.id,
			// 				...req.body
			// 			}
			// 		})
			// 	} else {
			// 		res.status(500).send({
			// 			success: false,
			// 			message: 'Fail'
			// 		})
			// 	}
			// })
		} else {
			res.status(400).send({
				success: false,
				message: "Must field"
			})
		} //belum
	},

	updatePutItem: (req, res) => {
		let id = req.params.id

		let {name, price, description} = req.body

		id = parseInt(id)
		price = parseInt(price)

		if (name && price && description) {
			updatePutItemModel([name, price, description, id], result => {
					if (result) {
						// console.log(result) // item yang diupdate
						res.send({
							success: true,
							message: 'Data has been updated',
							data: result
						})
					} 
					else if (result === null) { //jika yg dicallback null, tampilkan itu
						res.send({
							success: false,
							message: 'Id not found'
						})
					}
					else {
						res.status({
							success: false,
							message: 'Update fail'
						})
					}
				})
		} else {
			res.send({
				success: false,
				message: 'Fill must be filled'
			})
		}

		// let sql = `UPDATE items SET name = '${name}', price = ${price}, description = '${description}' WHERE id = ${id}`

		// db.query(sql, (err, result, fields) => {

		// 	console.log(result)

		// 	let cek = result.affectedRows

		// 	if (name, price, description) {
		// 		if (cek > 0) {
		// 			if (!err) {
		// 				res.send({
		// 					success: true,
		// 					message: "Data has been updated",
		// 					data: {
		// 						...req.body
		// 					}
		// 				})
		// 			} else {
		// 				res.send({
		// 					success: false,
		// 					message: "Fail to update"
		// 				})
		// 				console.log(err)
		// 			}
		// 		} else {
		// 			res.send({
		// 				success: false,
		// 				message: "Data not found"
		// 			})
		// 		}
		// 	}


		// }) //belum

	},

	updatePatchItem: (req, res) => {
		let id = req.params.id
		let {name='', price='', description=''} = req.body
		id = parseInt(id)



		if (name.trim() || price.trim() || description.trim()) {
			const data = Object.entries(req.body).map(item => {
						return parseInt(item[1])>0? `${item[0]}=${item[1]}`:`${item[0]}='${item[1]}'`
					})
			updatePatchItemModel([data, id], result => {
				if (result) {
						// console.log(result) // item yang diupdate
						res.send({
							success: true,
							message: 'Data has been updated',
							data: result
						})
					} 
					else if (result === null) { //jika yg dicallback null, tampilkan itu
						res.send({
							success: false,
							message: 'Id not found'
						})
					}
					else {
						res.status({
							success: false,
							message: 'Update fail'
						})
					}
			})
			// let sql = `SELECT * FROM items WHERE id = ${id}`
			// db.query(sql, (err, result, fields) => {
			// 	if (result.length) {
			// 		//kurang paham
					// const data = Object.entries(req.body).map(item => {
					// 	return parseInt(item[1])>0? `${item[0]}=${item[1]}`:`${item[0]}='${item[1]}'`
					// })
			// 		let sql = `UPDATE items SET ${data} WHERE id = ${id}`
			// 		// console.log(sql)
			// 		db.query(sql, (err, result, fields) => {
			// 			console.log(result)
			// 			if (result.affectedRows) {
			// 				res.send({
			// 					success: true,
			// 					message: "Update succes",
			// 					data: {
			// 						...req.body
			// 					}
			// 				})
			// 			} else {
			// 				res.send({
			// 					success: false,
			// 					message: "Update fail"
			// 				})
			// 			}
			// 		})
			// 	} else {
			// 		res.send({
			// 			success: false,
			// 			message: "Data not found",
			// 		})
			// 	}
			// })
			
		} else {
			res.send({
				success: false,
				message: "At least fill one column"
			})
		} //belum
	},

	deleteItem: (req, res) => {
		let id = req.params.id

		id = parseInt(id)

		deleteItemModel(id, result => {
			if (result.affectedRows) {
				res.send({
					success: true,
					message:`Delete ${id} success`,
					data: result
				})
			} else {
				res.send({
					success: false,
					message: "Delete fail"
				})
			}
		})

		// let sql = `SELECT * FROM items WHERE id = ${id}`
		// db.query(sql, (err, result, fields) => {
		// 	if (result.length) {
		// 		let sql = `DELETE FROM items WHERE id= ${id}`
		// 		db.query(sql, (err, result, fields) => {
		// 			if (result.affectedRows) {
		// 				res.send({
		// 					success: true,
		// 					message:`Delete ${id} success`,
		// 					data: result
		// 				})
		// 			} else {
		// 				res.send({
		// 					success: false,
		// 					message: "Delete fail"
		// 				})
		// 			}
		// 		})
		// 	} else {
		// 		res.send({
		// 			success: false,
		// 			message: "Data not found"
		// 		})
		// 	}
		// })
	}

}