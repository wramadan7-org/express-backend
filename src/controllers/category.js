
const { createdCategoryModel, readAllCategoryModel, readCategoryIdModel, readAllCategoryJoinModel, updatePatchCategoryModel, updatePutCategoryModel, deleteCategoryModel } = require('../models/category')
const { pageInfo } = require('../helpers/pageInfo')
const response = require('../helpers/respons')
const qs = require('querystring')
const { payload } = require('../helpers/getPayload')

module.exports = {
	createdCategory: (req, res) => {

		const { name_category } = req.body
		const picture = req.file.filename
		const size = req.file.size
		const mimetype = req.file.mimetype
		const type = mimetype.split('/')
		let data = {}
		const { authorization } = req.headers
		const pay = payload(authorization)
		const role = pay.user.id_role

		// console.log(req.file)
		if (role == 1) {
			if (size < 500000 && type[0] == 'image') {
				createdCategoryModel([name_category, picture], result => {
					if (result.affectedRows > 0) {
						data = {
							...req.body,
							...req.file
						}
						// console.log(result)
						return response(res, 'Data has been insert', { data }, true)
					} else {
						return response(res, 'Fail insert', '', false)
					}
				})
			} else {
				return response(res, 'File must be image and image < 500KB', '', false)
			}
		} else {
			return response(res, 'You are not admin')
		}
	},

	readAllCategory: (req, res) => {
		let { search, limit, page } = req.query


		let searchKey = ''
		let searchValue = ''

		if (typeof search === 'object') {
			searchKey = Object.keys(search)[0]
			searchValue = Object.values(search)[0]
		} else {
			searchKey = 'name_category'
			searchValue = search || ''
			// console.log(search)
		}

		if (!limit) {
			limit = 5
		} else {
			limit = parseInt(limit)
		}

		if (!page) {
			page = 1
		} else {
			page = parseInt(page)
		}

		let offset = (page - 1) * limit

		readAllCategoryModel([searchKey, searchValue, limit, offset], (result, data) => {

			if (result) {
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
					pageInfo.nextLink = `http://localhost:8080/category?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
				}
				if (currentPage >= pages) {
					pageInfo.prevLink = `http://localhost:8080/category?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
				}

				return response(res, 'You can see all data', { result, pageInfo }, true)
			} else {
				return response(res, 'Wrong key', '', false)
			}
		})
	},

	readCategoryId: (req, res) => {
		let { id } = req.params
		let data = {}
		readCategoryIdModel(id, result => {
			if (result) {
				data = { ...result[0] }
				// console.log({ ...result[0] })
				return response(res, `Data with Id ${id}`, { data }, true)
				// console.log(result)
				// res.send({
				// 	success: true,
				// 	message: `Data with Id ${id}`,
				// 	data: result[0]
				// })
			} else {
				return response(res, 'Data not found', '', false)
				// res.send({
				// 	success: false,
				// 	message: 'Data not found'
				// })
			}
		})
	},

	readAllCategoryJoin: (req, res) => {
		let { search, limit } = req.query
		let { id } = req.params

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

		readAllCategoryJoinModel([searchKey, searchValue, id], result => {
			// console.log(result)
			if (result) {
				return response(res, 'All data by category name', { result }, true)
				// res.send({
				// 	success: true,
				// 	message: 'You can see all data',
				// 	data: {
				// 		result
				// 	}
				// })
			} else {
				return response(res, 'Wrong key', '', false)
				// res.send({
				// 	success: false,
				// 	message: 'Wrong key'
				// })
			}
		})
	},
	//patch untuk picture error
	updatePatchCategory: (req, res) => {
		let { name_category = '' } = req.body
		let picture = req.file
		let { id } = req.params
		// const size = req.file.size
		// console.log(picture)
		// const mimetype = req.file.mimetype
		// const type = mimetype.split('/')
		let data = {}

		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth()
		let dat = date.getDate()
		let hour = date.getHours()
		let min = date.getMinutes()
		let sec = date.getSeconds()
		let dateNow = `${year}-${month}-${dat} ${hour}:${min}:${sec}`

		if (name_category || picture) {
			// if (size < 500000 && type[0] == 'image') {
			updatePatchCategoryModel([name_category, id, picture, dateNow], result => {
				// console.log(name_category)
				if (result) {
					data = {
						...req.body,
						...req.file
					}
					return response(res, `Data ${id} has been updated`, { data }, true)
					// res.send({
					// 	success: true,
					// 	message: `Data ${id} has been updated`,
					// 	data: {
					// 		...req.body
					// 	}
					// })
				} else if (result === null) {
					return response(res, 'Data not found', '', false)
					// res.send({
					// 	success: false,
					// 	message: `Data not found`
					// })
				}
				else {
					return response(res, 'Fail updated')
					// res.send({
					// 	success: false,
					// 	message: `Fail update`
					// })
				}

			})
			// } else {
			// 	return response(res, `File must be image and image < 500KB`)
			// }
		} else {
			return response(res, 'Fill the column')
			// res.send({
			// 	success: false,
			// 	message: `Fill the column`
			// })
		}
	},

	updatePutCategory: (req, res) => {
		const { name_category } = req.body
		const picture = req.file.filename
		// console.log(picture)
		const size = req.file.size
		const mimetype = req.file.mimetype
		const type = mimetype.split('/')
		const { id } = req.params
		let data = {}
		const { authorization } = req.headers
		const pay = payload(authorization)
		const role = pay.user.id_role

		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth()
		let dat = date.getDate()
		let hour = date.getHours()
		let min = date.getMinutes()
		let sec = date.getSeconds()
		let dateNow = `${year}-${month}-${dat} ${hour}:${min}:${sec}`

		if (role == 1) {
			if (name_category, picture) {
				if (size < 500000 && type[0] == 'image') {
					updatePutCategoryModel([name_category, id, picture, dateNow], result => {
						// console.log(result)
						if (result) {
							if (result.affectedRows > 0) {
								data = {
									...req.body,
									...req.file
								}

								return response(res, `Data ${id} has been updated`, { data }, true)
							} else {
								return response(res, `Data ${id} fail to update, please check ID!`, '', false)
							}
						} else {
							return response(res, `Data ${id} not found`, '', false)
						}
					})
				}
			} else {
				return response(res, `All column must be fill`, '', false)
			}
		} else {
			return response(res, 'You are not admin', '', false)
		}
	},

	deleteCategory: (req, res) => {
		const { id } = req.params
		// console.log(id)
		let data = {}
		const { authorization } = req.headers
		const pay = payload(authorization)
		const role = pay.user.id_role

		if (role == 1) {
			deleteCategoryModel(id, result => {
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
			return response(res, 'Ypu are not admin', '', false)
		}
	}
}