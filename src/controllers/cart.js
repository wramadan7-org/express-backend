/* eslint-disable camelcase */
const response = require('../helpers/respons')
// const { payload } = require('../helpers/getPayload')
const { createCartModel, readCartModel, deleteCartModel } = require('../models/cart')
const Joi = require('joi')

module.exports = {
  createCart: (req, res) => {
    const { id_item, qty } = req.body
    // const { authorization } = req.headers
    // const pay = payload(authorization)
    // const role = pay.user.id_role
    // const id_user = pay.user.id_user

    const encript = req.user.user
    const id_user = encript.id_user

    if (parseInt(id_item), parseInt(qty)) {
      createCartModel([id_user, id_item, qty], result => {
        // console.log(result)
        if (result !== null) {
          const data = {
            id_user,
            ...req.body
          }
          return response(res, 'Cart has been add', { data }, true)
        } else {
          return response(res, 'Fail to add cart', '', false)
        }
      })
    } else {
      return response(res, 'Fill all column with ID and column must bee integer', '', false)
    }
  },

  readCart: (req, res) => {
    // const { authorization } = req.headers
    // const pay = payload(authorization)
    // const id_user = pay.user.id_user

    const encript = req.user.user
    const id_user = encript.id_user

    readCartModel(id_user, (result, tot) => {
      const results = result.map(res => {
        // // console.log(res.qty, res.price)
        const data = {
          id: res.id,
          id_user: res.id_user,
          name: res.name,
          item: res.item,
          picture: res.picture,
          qty: res.qty,
          price: res.qty * res.price
        }
        return data
      })
      // console.log()
      // return response(res, 'All your cart', { results }, true)

      if (result.length) {
        return response(res, 'All your cart', { results, ...tot }, true)
      } else {
        return response(res, 'You dont have cart', '', false)
      }
    })
  },

  deleteCart: (req, res) => {
    const { id } = req.params
    const encript = req.user.user
    const id_user = encript.id_user

    deleteCartModel([id, id_user], result => {
      if (result) {
        return response(res, `Data ${id} has been deleted`)
      } else {
        return response(res, 'Fail to delete, ID not found')
      }
    })
  }
}
