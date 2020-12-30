/* eslint-disable camelcase */
const response = require('../helpers/respons')
// const { payload } = require('../helpers/getPayload')
const { createCartModel, readCartModel, deleteCartModel } = require('../models/cart')
const joi = require('joi')

module.exports = {
  createCart: (req, res) => {
    try {
      const schema = joi.object({
        id_item: joi.number().required(),
        qty: joi.number().required()
      })

      const { value, error } = schema.validate(req.body)
      const { id_item, qty } = value

      if (error) {
        return response(res, `Validate: ${error}`, '', false)
      } else {
        const { id_user } = req.user.user

        // if (parseInt(id_item), parseInt(qty)) {
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
        // } else {
        //   return response(res, 'Fill all column with ID and column must bee integer', '', false)
        // }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  },

  readCart: (req, res) => {
    const { id_user } = req.user.user

    readCartModel(id_user, (result, tot) => {
      if (result.length) {
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
        return response(res, 'All your cart', { results, ...tot }, true)
      } else {
        return response(res, `${result}`, '', false)
      }
    })
  },

  deleteCart: (req, res) => {
    const { id } = req.params
    const { id_user } = req.user.user

    deleteCartModel([id, id_user], result => {
      if (result) {
        return response(res, `Data ${id} has been deleted`)
      } else {
        return response(res, 'Fail to delete, ID not found')
      }
    })
  }
}
