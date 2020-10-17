const qs = require('querystring')
const { createItemModel, getItemModel, getAllItemModel, updatePutItemModel, updatePatchItemModel, deleteItemModel } = require('../models/items')
const response = require('../helpers/respons')
// const { payload } = require('../helpers/getPayload')
const { off } = require('process')
const Joi = require('joi')

module.exports = {

	getDetailItem: (req, res) => {
		let { id } = req.params
		let data = {}

		getItemModel(id, result => {
			if (result.length) {
				data = {
					...result[0],
					...req.file
				}
				return response(res, `Product Id ${id}`, { data }, true)
			} else {
				return response(res, `Product Id ${id} not found`, '', false)
			}
		})
	},

	//Kurang pageInfo
	getAllItems: (req, res) => {

		let { page, limit, search } = req.query

		let searchKey = ''
		let searchValue = ''

		if (typeof search === 'object') {
			searchKey = Object.keys(search)[0]
			searchValue = Object.values(search)[0]
		} else {
			searchKey = 'name'
			searchValue = search || ''
			// console.log(search)
		}

		if (!limit) {
			limit = 20
		} else {
			limit = parseInt(limit)
		}
		if (!page) {
			page = 1
		} else {
			page = parseInt(page)
		}
		//kenapa di parseInt, karena inpuan bersifat string jadi jika ingin mengamil nomor, harus di ganti dgn tipedata number
		const offset = (page - 1) * limit

		getAllItemModel([searchKey, searchValue, limit, offset], (result, data) => {
			if (result) {
				//param total data berisi object count yang value jumlah data di db
				//mengambil value di totalData
				const pageInfo = {
					totalData: data.count,
					pages: Math.ceil(data.count / limit),
					data: result.length,
					currentPage: page,
					limitPage: limit,
					nextLink: null,
					prevLink: null
				}
				let { pages, currentPage, totalData } = pageInfo

				if (currentPage < pages) {
					pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
				}
				if (currentPage >= pages) {
					pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
				}

				return response(res, `All item`, { result, pageInfo }, true)

			}
			else {
				return response(res, `Wrong key`, '', false)
			}
		})


	},

	createdItem: (req, res) => {
		const { name, price, description, id_category, id_color, id_condition } = req.body
		const picture = req.file.filename
		const size = req.file.size
		const mimetype = req.file.mimetype
		const type = mimetype.split('/')
		const encript = req.user.user
		const role = encript.id_role
		let data = {}
		if (name && price && description && id_category && picture && id_condition) {
			if (role == 1) {
				if (size < 500000 && type[0] == 'image') {
					createItemModel([name, price, description, id_category, picture, id_color, id_condition], result => {
						// console.log(picture)
						if (result.affectedRows > 0) {
							data = {
								...req.body,
								...req.file
							}
							return response(res, `Items has been created`, { data }, true)
						} else {
							return response(res, `Fail to create item`, '', false)
						}
					})
				} else {
					return response(res, `File must be image and image < 500KB`, '', false)
				}
			} else {
				return response(res, 'You are not admin', '', false)
			}
		} else {
			return response(res, `Fill all column!`, '', false)
		}
	},

	updatePutItem: (req, res) => {
		let { id } = req.params

		let { name, price, description, id_category, id_color, id_condition } = req.body
		let picture = req.file.filename
		let size = req.file.size
		let mimetype = req.file.mimetype
		let type = mimetype.split('/')

		id = parseInt(id)
		id_category = parseInt(id_category)
		price = parseInt(price)
		const encript = req.user.user
		const role = encript.id_role
		const id_user = encript.id_user

		if (role == 1) {
			if (name && price && description && id_category && id_color && id_condition) {
				if (size < 500000 && type[0] == 'image') {
					let date = new Date()
					let year = date.getFullYear()
					let month = date.getMonth()
					let dat = date.getDate()
					let hour = date.getHours()
					let min = date.getMinutes()
					let sec = date.getSeconds()
					let dateNow = `${year}-${month}-${dat} ${hour}:${min}:${sec}`
					// console.log(s)
					// console.log(date)
					updatePutItemModel([name, price, description, id, id_category, picture, dateNow, id_color, id_condition], result => {
						if (result) {
							// console.log(result) // item yang diupdate
							return response(res, 'Data has been updated', { result }, true)
						}
						else if (result === null) { //jika yg dicallback null, tampilkan itu
							return response(res, `Id ${id} not found`, '', false)
						}
						else {
							return response(res, 'Updated fail', '', false)
						}
					})
				} else {
					return response(res, 'File must be image and image < 500KB')
				}
			} else {
				return response(res, 'Fill all column', '', false)
			}
		} else {
			return response(res, 'You are not admin', '', false)
		}
	},

	//error
	updatePatchItem: (req, res) => {
		let id = req.params
		let { name = '', price = '', description = '', id_category = '' } = req.body
		id = parseInt(id)
		const encript = req.user.user
		const role = encript.id_role

		if (role == 1) {
			if (name.trim() || price.trim() || description.trim() || id_category.trim()) {
				const data = Object.entries(req.body).map(item => {
					return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
				})
				updatePatchItemModel([data, id], result => {
					if (result) {
						// console.log(result) // item yang diupdate
						return response(res, 'Data has been update', { result }, true)
					}
					else if (result === null) { //jika yg dicallback null, tampilkan itu
						return response(res, `Id ${id} not found`, '', false)
					}
					else {
						return response(res, 'Updated fail', '', false)
					}
				})

			} else {
				return response(res, 'Fill all column', '', false)
			}
		} else {
			return response(res, 'You are not admin', '', false)
		}
	},

	deleteItem: (req, res) => {
		let { id } = req.params
		const encript = req.user.user
		const role = encript.id_role

		if (role == 1) {
			deleteItemModel(id, result => {
				if (result) {
					data = {
						...req.params
					}
					return response(res, `Data ${id} deleted`, { data }, true)
				} else {
					return response(res, `Id ${id} not found`, '', false)
				}
			})
		} else {
			return response(res, 'You are not admin', '', false)
		}
	}
}