const { addColorModel, getColorModel, deleteColorModel } = require('../models/color')
const response = require('../helpers/respons')

module.exports = {
    addColor: (req, res) => {
        const { color } = req.body

        if (color.trim()) {
            addColorModel(color, result => {
                if (result.affectedRows > 0) {
                    return response(res, 'Add color success', { ...req.body }, true)
                } else {
                    return response(res, 'Fail add color', '', false)
                }
            })
        } else {
            return response(res, 'Fill column', '', false)
        }
    },

    getColor: (req, res) => {
        getColorModel(result => {
            if (result) {
                return response(res, 'List color', { result }, true)
            } else {
                return response(res, 'Fail get list', '', false)
            }
        })
    },

    deleteColor: (req, res) => {
        const { id } = req.params

        deleteColorModel(id, result => {
            if (result.affectedRows > 0) {
                console.log(result)
                return response(res, `Id ${id} deleted`, '', true)
            } else {
                return response(res, `Id ${id} not found`, '', false)
            }
        })
    }

}