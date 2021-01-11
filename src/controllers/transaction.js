/* eslint-disable camelcase */
const response = require('../helpers/respons')
const { addTransactionModel, getTransactionModel } = require('../models/transaction')
const { addHistory } = require('../models/history')
const { readCartModel, deleteAllCartByUserModel } = require('../models/cart')

module.exports = {
  addTransaction: (req, res) => {
    try {
      const { id_user } = req.user.user

      const date = new Date()
      console.log(date)

      readCartModel(id_user, (resultCart, total) => {
        if (resultCart.length > 0) {
          // random nota
          function makeNota (length) {
            let randomNota = ''
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            const charactersLength = characters.length
            for (let i = 0; i < length; i++) {
              randomNota += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return randomNota
          }
          const make = makeNota(30)

          // AMBIL DATA CART
          const mapingCart = resultCart.map(o => {
            const dataCart = {
              id_user: o.id_user,
              id_item: o.id_item,
              qty: o.qty,
              nota: make,
              ...total
            }
            return dataCart
          })

          // MAPING UNTUK MENGAMBIL DATA2 YANG DIPERLUKAN INSERT MULTI KE MYSQL
          const mapingHistory = mapingCart.map(r => {
            const destructing = { ...r }
            // console.log('map', `(${m.id_item}, ${m.id_user}, ${m.qty}, '${m.nota}', ${m.total}),`)
            const dataHistory = `(${destructing.id_item}, ${destructing.id_user}, 1, ${destructing.qty}, ${destructing.total}, '${destructing.nota}')`
            // console.log(y)

            return dataHistory
          })

          // EKSEKUSI
          const getTotal = { ...total }
          addTransactionModel([make, 1, getTotal.total], resultTransaction => {
            console.log(resultTransaction)
            if (resultTransaction.affectedRows > 0) {
              addHistory(mapingHistory, resultsHistory => {
                if (resultsHistory.affectedRows > 0) {
                  deleteAllCartByUserModel([id_user], resultDeleteCart => {
                    console.log(resultDeleteCart)
                    if (resultDeleteCart) {
                      return response(res, 'Transactions successfully', '', true)
                    } else {
                      return response(res, 'Error: Delete cart fail', '', false)
                    }
                  })
                } else {
                  return response(res, 'Error: Add history fail', '', false)
                }
              })
            } else {
              return response(res, 'Error: Transactions fail', '', false)
            }
          })
        }
      })
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  },

  getTransaction: (req, res) => {
    try {
      const { id_user } = req.user.user

      getTransactionModel(id_user, result => {
        if (result.length) {
          return response(res, 'Your transactions', { result }, true)
        } else {
          return response(res, 'You dont have a transaction', '', true)
        }
      })
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  }
}
