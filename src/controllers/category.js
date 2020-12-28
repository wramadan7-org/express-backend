/* eslint-disable camelcase */
require('dotenv').config()
const { createdCategoryModel, readAllCategoryModel, readCategoryIdModel, readAllCategoryJoinModel, updatePatchCategoryModel, updatePutCategoryModel, deleteCategoryModel } = require('../models/category')
// const { pageInfo } = require('../helpers/pageInfo')
const response = require('../helpers/respons')
const qs = require('querystring')
// const { payload } = require('../helpers/getPayload')
const joi = require('joi')

module.exports = {
  createdCategory: (req, res) => {
    const { name_category } = req.body
    const picture = `uploads/${req.file.filename}`
    const size = req.file.size
    const mimetype = req.file.mimetype
    const type = mimetype.split('/')
    let data = {}
    const encript = req.user.user
    const role = encript.id_role

    // console.log(req.file)
    if (role === 1) {
      if (size < 500000 && type[0] === 'image') {
        createdCategoryModel([name_category, picture], result => {
          if (result.affectedRows > 0) {
            data = {
              ...req.body,
              picture
            }
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
      limit = 20
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

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
        const { pages, currentPage, totalData } = pageInfo

        if (currentPage < pages) {
          pageInfo.nextLink = `${process.env.APP_URL}category?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
        } else if (currentPage >= pages) {
          pageInfo.prevLink = `${process.env.APP_URL}category?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
        }

        return response(res, 'You can see all data', { result, pageInfo }, true)
      } else {
        return response(res, 'Wrong key', '', false)
      }
    })
  },

  readCategoryId: (req, res) => {
    const { id } = req.params
    let data = {}
    readCategoryIdModel(id, result => {
      if (result) {
        data = { ...result[0] }
        // console.log({ ...result[0] })
        return response(res, `Data with Id ${id}`, { data }, true)
      } else {
        return response(res, 'Data not found', '', false)
      }
    })
  },

  readAllCategoryJoin: (req, res) => {
    const { search, limit } = req.query
    const { id } = req.params

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
      } else {
        return response(res, 'Wrong key', '', false)
      }
    })
  },
  // patch untuk picture error
  updatePatchCategory: (req, res) => {
    const { name_category = '' } = req.body
    const picture = `uploads/${req.file.filename}`
    const { id } = req.params
    // const size = req.file.size
    // console.log(picture)
    // const mimetype = req.file.mimetype
    // const type = mimetype.split('/')
    let data = {}

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const dat = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    const dateNow = `${year}-${month}-${dat} ${hour}:${min}:${sec}`

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
        } else if (result === null) {
          return response(res, 'Data not found', '', false)
        } else {
          return response(res, 'Fail updated')
        }
      })
      // } else {
      // return response(res, `File must be image and image < 500KB`)
      // }
    } else {
      return response(res, 'Fill the column')
    }
  },

  updatePutCategory: (req, res) => {
    const { name_category } = req.body
    const picture = `uploads/${req.file.filename}`
    // console.log(picture)
    const size = req.file.size
    const mimetype = req.file.mimetype
    const type = mimetype.split('/')
    const { id } = req.params
    let data = {}
    const encript = req.user.user
    const role = encript.id_role

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const dat = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    const dateNow = `${year}-${month}-${dat} ${hour}:${min}:${sec}`

    if (role === 1) {
      if (name_category, picture) {
        if (size < 500000 && type[0] === 'image') {
          updatePutCategoryModel([name_category, id, picture, dateNow], result => {
            // console.log(result)
            if (result) {
              if (result.affectedRows > 0) {
                data = {
                  ...req.body,
                  picture
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
        return response(res, 'All column must be fill', '', false)
      }
    } else {
      return response(res, 'You are not admin', '', false)
    }
  },

  deleteCategory: (req, res) => {
    const { id } = req.params
    // console.log(id)
    let data = {}
    const encript = req.user.user
    const role = encript.id_role

    if (role === 1) {
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
