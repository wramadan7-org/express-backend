const response = require('../helpers/respons')
const { addTransacionModel, getTransactionModel } = require('../models/transaction')

module.exports = {
    getTransaction: (req, res) => {
        const encript = req.user.user
        const id_user = encript.id_user
        console.log(id_user)

        getTransactionModel(id_user, result => {
            if (result.length) {
                return response(res, 'Your transactions', { result }, true)
            } else {
                return response(res, 'You dont have a transaction', '', false)
            }
        })
    }
}