const {
    createdUserModel, getUserModel, getAllUserModel, getUserByIdModel, updatePatchUserModel,
    updatePutUserModel, addAddressModel, getAddressModel, updatePutAddressModel,
    deleteAddressModel, updatePatchByUserModel
} = require('../models/user')

// const upload = require('../helpers/uploadProfile')
const response = require('../helpers/respons')
const bcrypte = require('bcrypt')
const joi = require('joi')

module.exports = {
    getAllUser: (req, res) => {
        getAllUserModel(result => {
            return response(res, 'All data', { result }, true)
        })
    },

    //CUSTOMER ---------------------------------------------------------------------------
    getUser: (req, res) => {
        const encript = req.user.user
        const id_user = encript.id_user
        getUserModel(id_user, result => {
            if (result.length) {
                const data = {
                    ...result[0]
                }
                return response(res, 'Your account', { data }, true)
            } else {
                return response(res, 'Your account not found', '', false)
            }
        })
    },

    //password saya hapus
    updatePutByUser: (req, res) => {
        const { name, email, phone, gender, date } = req.body
        const image = req.file ? req.file.filename : ''
        const encript = req.user.user
        const id_user = encript.id_user
        // const salt = bcrypte.genSaltSync(10)
        // const hash = bcrypte.hashSync(password, salt)

        if (name, email, phone, gender, date) {
            updatePutUserModel([id_user, name, email, phone, gender, date, image], result => {
                if (result) {
                    const data = { result }
                    return response(res, `Updated success`, data, true)
                } else {
                    return response(res, `Updated fail`, '', false)
                }
            })
        } else {
            return response(res, 'Fill all column', '', false)
        }
    },

    updatePatchByUser: (req, res) => {
        try {
            const schema = joi.object({
                name: joi.string().required(),
                email: joi.string().email().required(),
                birthdate: joi.string(),
                password: joi.string().required()
            })
            const {value, error} = schema.validate(req.body)
            const {name, email, birthdate, password} = value
            const {id_user} = req.user.user
            const salt = bcrypte.genSaltSync(10)
            const hash = bcrypte.hashSync(password, salt)
            if (error) {
                return response(res, `${error}`, '', false)
            } else {
                if (req.file === undefined) {
                   const photo = ''
                   getUserModel(id_user, checkUser => {
                       if (checkUser.length) {
                            updatePatchByUserModel([id_user, name, email, birthdate, hash, photo], result => {
                                if (result.affectedRows > 0) {
                                    getUserModel(id_user, getResult => {
                                        if (getResult.length) {
                                            // console.log(getResult)
                                            const data = {
                                                ...getResult[0]
                                            }
                                            return response(res, 'Edit success', {data}, true)
                                        } else {
                                            return response(res, 'Fail to edit', '', false)
                                        }
                                    })
                                } else {
                                    return response(res, 'Fail to edit', '', false)
                                }
                            })
                       } else {
                           return response(res, 'User not found', '', false)
                       }
                   })
                } else {
                    const photo = `http://localhost:8080/uploads/${req.file.filename}`
                    getUserModel(id_user, checkUser => {
                        if (checkUser.length) {
                            updatePatchByUserModel([id_user, name, email, birthdate, hash, photo], result => {
                                if (result.affectedRows > 0) {
                                    getUserModel(id_user, getResult => {
                                        if (getResult.length) {
                                            // console.log(getResult)
                                            const data = {
                                                ...getResult[0]
                                            }
                                            return response(res, 'Edit success', {data}, true)
                                        }
                                    })
                                }
                            })
                        } else {
                            return response(res, 'User not found', '', false)
                        }
                    })
                }
            }
        } catch (err) {
            return response(res, `${err}`, '', false)
        }
    },

    UpdatePatchUserMobile: (req, res) => {
        try {
            const schema = joi.object({
                name: joi.string().required(),
                birthdate: joi.string(),
            })
            const {value, error} = schema.validate(req.body)
            const {name, birthdate} = value
            const {id_user} = req.user.user
            if (error) {
                return response(res, `${error}`, '', false)
            } else {
                // if (req.file === undefined) {
                //    const photo = ''
                   getUserModel(id_user, checkUser => {
                       if (checkUser.length) {
                            updatePatchByUserMobileModel([id_user, name, birthdate], result => {
                                if (result.affectedRows > 0) {
                                    getUserModel(id_user, getResult => {
                                        if (getResult.length) {
                                            // console.log(getResult)
                                            const data = {
                                                ...getResult[0]
                                            }
                                            return response(res, 'Edit success', {data}, true)
                                        } else {
                                            return response(res, 'Fail to edit', '', false)
                                        }
                                    })
                                } else {
                                    return response(res, 'Fail to edit', '', false)
                                }
                            })
                       } else {
                           return response(res, 'User not found', '', false)
                       }
                   })
                // } else {
                //     const photo = `http://localhost:8080/uploads/${req.file.filename}`
                //     getUserModel(id_user, checkUser => {
                //         if (checkUser.length) {
                //             updatePatchByUserModel([id_user, name, email, birthdate, hash, photo], result => {
                //                 if (result.affectedRows > 0) {
                //                     getUserModel(id_user, getResult => {
                //                         if (getResult.length) {
                //                             // console.log(getResult)
                //                             const data = {
                //                                 ...getResult[0]
                //                             }
                //                             return response(res, 'Edit success', {data}, true)
                //                         }
                //                     })
                //                 }
                //             })
                //         } else {
                //             return response(res, 'User not found', '', false)
                //         }
                //     })
                // }
            }
        } catch (err) {
            return response(res, `${err}`, '', false)
        }
    },

    //----------------------------------------------------------------------------

    getUserById: (req, res) => {
        const { id } = req.params
        getUserByIdModel(id, result => {
            if (result) {
                return response(res, `Data ID ${id}`, { result }, true)
            } else {
                return response(res, 'Data not found', '', false)
            }
        })
    },

    updatePut: (req, res) => {
        const { name, email, password, phone, gender, date } = req.body
        const { id } = req.params

        // const salt = bcrypte.genSaltSync(10)
        // const hash = bcrypte.hashSync(password, salt)

        if (name, email, password, phone, gender, date) {
            updatePutUserModel([id, name, email, password, phone, gender, date], result => {
                if (result) {
                    const data = { result }
                    return response(res, `Updated success`, data, true)
                } else {
                    return response(res, `Updated fail`, '', false)
                }
            })
        } else {
            return response(res, 'Fill all column', '', false)
        }
    },

    updatePatch: (req, res) => {
        const { name, email, password, phone, gender, date, s } = req.body
        const { id } = req.params
        if (name || email || password || phone || gender || date) {
            updatePatchUserModel([id, name, email, password, phone, gender, date], result => {
                if (result.affectedRows > 0) {
                    return response(res, `Updated success`, { ...req.body }, true)
                } else {
                    return response(res, `Updated fail`, '', false)
                }
            })
        } else {
            return response(res, 'Wrong keys', '', false)
        }
    },

    createdUser: (req, res) => {
        const { id_role, name, email, password } = req.body
        const image = req.file.filename
        // console.log(image)
        const salt = bcrypte.genSaltSync(10)
        const hash = bcrypte.hashSync(password, salt)

        const payload = req.user.user
        const role = payload.id_role

        if (role == 1) {
            createdUserModel([parseInt(id_role), name, email, hash], result => {
                if (result.affectedRows > 0) {
                    const data = {
                        ...req.body,
                        image
                    }
                    // console.log(data)
                    return response(res, `Data has been added`, { data }, true)
                } else {
                    return response(res, 'Fail to add user', '', false)
                }
            })
        } else {
            return response(res, 'You are not admin', '', false)
        }
    },

    addAddress: (req, res) => {
        const { homeAddress, recepientsName, recepientsNumber, address, postalCode, city } = req.body
        const encript = req.user.user
        const id_user = encript.id_user
        addAddressModel([id_user, homeAddress, recepientsName, recepientsNumber, address, postalCode, city], result => {
            // console.log(result)
            const data = { ...req.body }
            if (result.affectedRows > 0) {
                return response(res, 'Your address success added', { data }, true)
            } else {
                return response(res, 'Fail to add', '', false)
            }
        })
    },

    getAddress: (req, res) => {
        const encript = req.user.user
        const id_user = encript.id_user
        getAddressModel(id_user, result => {
            if (result.length) {
                return response(res, 'Your address', { result }, true)
            } else {
                return response(res, 'You dont have address, please add address!', '', false)
            }
        })
    },

    updatePutAddress: (req, res) => {
        const { homeAddress, recepientsName, recepientsNumber, address, postalCode, city } = req.body
        const { id } = req.params
        const encript = req.user.user
        const id_user = encript.id_user
        if (homeAddress, recepientsName, recepientsNumber, address, postalCode, city) {
            updatePutAddressModel([id_user, homeAddress, recepientsName, recepientsNumber, address, postalCode, city, id], result => {
                if (result.affectedRows > 0) {
                    const data = { ...req.body }
                    // console.log(data)
                    return response(res, 'Your address has been updated', { data }, true)
                } else {
                    return response(res, 'Fail to update address', '', false)
                }
            })
        } else {
            return response(res, 'Fill all column', '', false)
        }
    },

    deleteAddress: (req, res) => {
        const { id } = req.params
        const encript = req.user.user
        const id_user = encript.id_user

        deleteAddressModel([id, id_user], result => {
            if (result) {
                return response(res, 'Your address has been deleted', '', true)
            } else {
                return response(res, 'Your address fail to update', '', false)
            }
        })
    }
}