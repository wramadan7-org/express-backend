/* eslint-disable camelcase */
require('dotenv').config()
const qs = require('querystring')
const {
  createItemModel,
  getItemModel,
  getAllItemModel,
  updatePutItemModel,
  updatePitItemWithoutPicture,
  updatePatchItemModel,
  deleteItemModel
} = require('../models/items')
const response = require('../helpers/respons')
// const { payload } = require('../helpers/getPayload')
const joi = require('joi')

module.exports = {

  getDetailItem: (req, res) => {
    const { id } = req.params
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

  // Kurang pageInfo
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
    // kenapa di parseInt, karena inpuan bersifat string jadi jika ingin mengamil nomor, harus di ganti dgn tipedata number
    const offset = (page - 1) * limit

    getAllItemModel([searchKey, searchValue, limit, offset], (result, data) => {
      if (result) {
        // param total data berisi object count yang value jumlah data di db
        // mengambil value di totalData
        const pageInfo = {
          totalData: data.count,
          pages: Math.ceil(data.count / limit),
          data: result.length,
          currentPage: page,
          limitPage: limit,
          nextLink: null,
          prevLink: null
        }
        const { pages, currentPage, totalData } = pageInfo

        if (currentPage < pages) {
          pageInfo.nextLink = `${process.env.APP_URL}items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
        }
        if (currentPage >= pages) {
          pageInfo.prevLink = `${process.env.APP_URL}items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
        }

        return response(res, 'All item', { result, pageInfo }, true)
      } else {
        return response(res, 'Wrong key', '', false)
      }
    })
  },

  createdItem: (req, res) => {
    // const { name, price, description, id_category, id_color, id_condition } = req.body
    const encript = req.user.user
    const role = encript.id_role
    let data = {}
    const schema = joi.object({
      name: joi.string().required(),
      price: joi.number().required(),
      description: joi.string().required(),
      id_category: joi.number().required(),
      id_color: joi.number().required(),
      id_condition: joi.number().required()
    })
    const { value, error } = schema.validate(req.body)
    const { name, price, description, id_category, id_color, id_condition } = value
    if (error) {
      return response(res, `Schema: ${error}`, '', false)
    } else {
      try {
        if (name && price && description && id_category && id_condition) {
          if (role === 1) {
            if (req.file === undefined) {
              const picture = ''
              createItemModel([name, price, description, id_category, picture, id_color, id_condition], result => {
                if (result.affectedRows > 0) {
                  data = {
                    ...req.body,
                    picture
                  }
                  return response(res, 'Items has been created', { data }, true)
                } else {
                  return response(res, 'Fail to create item', '', false)
                }
              })
            } else {
              const picture = `uploads/${req.file.filename}`
              // const size = req.file.size
              // const mimetype = req.file.mimetype
              // const type = mimetype.split('/')
              // if (size < 500000 && type[0] == 'image') {
              createItemModel([name, price, description, id_category, picture, id_color, id_condition], result => {
                // console.log(picture)
                if (result.affectedRows > 0) {
                  data = {
                    ...req.body,
                    picture
                  }
                  return response(res, 'Items has been created', { data }, true)
                } else {
                  return response(res, 'Fail to create item', '', false)
                }
              })
              // } else {
              // return response(res, `File must be image and image < 500KB`, '', false)
              // }
            }
          } else {
            return response(res, 'You are not admin', '', false)
          }
        } else {
          return response(res, 'Fill all column!', '', false)
        }
      } catch (err) {
        return response(res, `${err}`, '', false)
      }
    }
  },

  updatePutItem: (req, res) => {
    let { id } = req.params

    const schema = joi.object({
      name: joi.string(),
      price: joi.number(),
      description: joi.string(),
      id_category: joi.number(),
      id_color: joi.number(),
      id_condition: joi.number()
    })
    const { value, error } = schema.validate(req.body)
    let { name, price, description, id_category, id_color, id_condition } = value

    id = parseInt(id)
    id_category = parseInt(id_category)
    price = parseInt(price)
    const encript = req.user.user
    const role = encript.id_role

    if (error) {
      return response(res, `Schema: ${error}`, '', false)
    } else {
      try {
        if (role === 1) {
          const date = new Date()
          const year = date.getFullYear()
          const month = date.getMonth()
          const dat = date.getDate()
          const hour = date.getHours()
          const min = date.getMinutes()
          const sec = date.getSeconds()
          const dateNow = `${year}-${month}-${dat} ${hour}:${min}:${sec}`
          // console.log(s)
          // console.log(date)
          if (req.file === undefined) {
            updatePitItemWithoutPicture([name, price, description, id, id_category, dateNow, id_color, id_condition], result => {
              if (result) {
                // console.log(result) // item yang diupdate
                return response(res, 'Data has been updated', { result }, true)
              } else if (result === null) { // jika yg dicallback null, tampilkan itu
                return response(res, `Id ${id} not found`, '', false)
              } else {
                return response(res, 'Updated fail', '', false)
              }
            })
          } else {
            const picture = `uploads/${req.file.filename}`
            const size = req.file.size
            const mimetype = req.file.mimetype
            const type = mimetype.split('/')
            if (size < 500000 && type[0] === 'image') {
              updatePutItemModel([name, price, description, id, id_category, picture, dateNow, id_color, id_condition], result => {
                if (result) {
                  // console.log(result) // item yang diupdate
                  return response(res, 'Data has been updated', { result }, true)
                } else if (result === null) { // jika yg dicallback null, tampilkan itu
                  return response(res, `Id ${id} not found`, '', false)
                } else {
                  return response(res, 'Updated fail', '', false)
                }
              })
            } else {
              return response(res, 'File must be image and image < 500KB')
            }
          }
        } else {
          return response(res, 'You are not admin', '', false)
        }
      } catch (err) {
        return response(res, `Catch: ${err}`, '', false)
      }
    }
  },

  // error
  updatePatchItem: (req, res) => {
    let id = req.params
    const { name = '', price = '', description = '', id_category = '' } = req.body
    id = parseInt(id)
    const encript = req.user.user
    const role = encript.id_role

    if (role === 1) {
      if (name.trim() || price.trim() || description.trim() || id_category.trim()) {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        updatePatchItemModel([data, id], result => {
          if (result) {
            // console.log(result) // item yang diupdate
            return response(res, 'Data has been update', { result }, true)
          } else if (result === null) { // jika yg dicallback null, tampilkan itu
            return response(res, `Id ${id} not found`, '', false)
          } else {
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
    const { id } = req.params
    const encript = req.user.user
    const role = encript.id_role

    if (role === 1) {
      deleteItemModel(id, result => {
        if (result) {
          const data = {
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
