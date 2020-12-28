
/* eslint-disable camelcase */
const {
  createdUserModel, getUserModel, getAllUserModel, getUserByIdModel, updatePatchUserModel,
  updatePutUserModel, addAddressModel, getAddressModel, updatePutAddressModel,
  deleteAddressModel, updatePatchByUserModel, updatePatchUserPhotoModel, changePasswordModel, updatePatchByUserMobileModel
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

  // CUSTOMER ---------------------------------------------------------------------------
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

  // password saya hapus
  updatePutByUser: (req, res) => {
    const { name, email, phone, gender, date } = req.body
    const encript = req.user.user
    const id_user = encript.id_user
    // const salt = bcrypte.genSaltSync(10)
    // const hash = bcrypte.hashSync(password, salt)

    if (req.file === undefined) {
      const photo = ''
      if (name, email, phone, gender, date) {
        updatePutUserModel([id_user, name, email, phone, gender, date, photo], result => {
          if (result) {
            const data = { result }
            return response(res, 'Updated success', data, true)
          } else {
            return response(res, 'Updated fail', '', false)
          }
        })
      } else {
        return response(res, 'Fill all column', '', false)
      }
    } else {
      const photo = `uploads/${req.file.filename}`
      if (name, email, phone, gender, date) {
        updatePutUserModel([id_user, name, email, phone, gender, date, photo], result => {
          if (result) {
            const data = { result }
            return response(res, 'Updated success', data, true)
          } else {
            return response(res, 'Updated fail', '', false)
          }
        })
      } else {
        return response(res, 'Fill all column', '', false)
      }
    }
  },

  updatePatchByUser: (req, res) => {
    try {
      const schema = joi.object({
        name: joi.string(),
        email: joi.string().email(),
        birthdate: joi.string(),
        // password: joi.string(),
        gender: joi.string(),
        phone: joi.string()
      })
      const { value, error } = schema.validate(req.body)
      const { name, email, birthdate, gender, phone } = value
      const { id_user } = req.user.user
      // const salt = bcrypte.genSaltSync(10)
      // const hash = bcrypte.hashSync(password, salt)
      if (error) {
        return response(res, `${error}`, '', false)
      } else {
        if (req.file === undefined) {
          const photo = ''
          getUserModel(id_user, checkUser => {
            if (checkUser.length) {
              updatePatchByUserModel([id_user, name, email, birthdate, photo, gender, phone], result => {
                if (result.affectedRows > 0) {
                  getUserModel(id_user, getResult => {
                    if (getResult.length) {
                      // console.log(getResult)
                      const data = {
                        ...getResult[0]
                      }
                      return response(res, 'Edit success', { data }, true)
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
          const photo = `uploads/${req.file.filename}`
          getUserModel(id_user, checkUser => {
            if (checkUser.length) {
              updatePatchByUserModel([id_user, name, email, birthdate, photo, gender, phone], result => {
                if (result.affectedRows > 0) {
                  getUserModel(id_user, getResult => {
                    if (getResult.length) {
                      // console.log(getResult)
                      const data = {
                        ...getResult[0]
                      }
                      return response(res, 'Edit success', { data }, true)
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

  updatePatchUserMobile: (req, res) => {
    try {
      const schema = joi.object({
        name: joi.string(),
        birthdate: joi.string(),
        email: joi.string().email(),
        gender: joi.string(),
        phone: joi.string()
      })
      const { value, error } = schema.validate(req.body)
      const { name, birthdate, email, gender, phone } = value
      const { id_user } = req.user.user
      // console.log(id_user)
      if (error) {
        return response(res, `Schema: ${error}`, '', false)
      } else {
        if (req.file === undefined) {
          const photo = ''
          getUserModel(id_user, checkUser => {
            if (checkUser.length) {
              console.log(checkUser[0].name)
              updatePatchByUserMobileModel([id_user, name, birthdate, email, gender, phone, photo], result => {
                console.log(result)
                if (result.affectedRows > 0) {
                  getUserModel(id_user, getResult => {
                    if (getResult.length) {
                      console.log(getResult)

                      const data = {
                        ...getResult[0]
                      }
                      return response(res, 'Edit success', { data }, true)
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
          const photo = `uploads/${req.file.filename}`
          getUserModel(id_user, checkUser => {
            if (checkUser.length) {
              updatePatchByUserMobileModel([id_user, name, birthdate, email, gender, phone, photo], result => {
                if (result.affectedRows > 0) {
                  getUserModel(id_user, getResult => {
                    if (getResult.length) {
                      // console.log(getResult)
                      const data = {
                        ...getResult[0]
                      }
                      return response(res, 'Edit success', { data }, true)
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
      return response(res, `Catch: ${err}`, '', false)
    }
  },

  updatePatchPhotoProfile: (req, res) => {
    try {
      const { id_user, name } = req.user.user
      if (req.file === undefined) {
        const photo = ''
        getUserModel(id_user, checkUser => {
          if (checkUser.length) {
            updatePatchUserPhotoModel([id_user, photo, name], result => {
              if (result.affectedRows > 0) {
                getUserModel(id_user, getResult => {
                  if (getResult.length) {
                    const data = {
                      ...getResult[0]
                    }
                    return response(res, 'Edit success', { data }, true)
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
        const photo = `uploads/${req.file.filename}`
        getUserModel(id_user, checkUser => {
          if (checkUser.length) {
            updatePatchUserPhotoModel([id_user, photo, name], result => {
              if (result.affectedRows > 0) {
                getUserModel(id_user, getResult => {
                  if (getResult.length) {
                    const data = {
                      ...getResult[0]
                    }
                    return response(res, 'Edit success', { data }, true)
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
      }
    } catch (err) {
      return response(res, `${err}`, '', false)
    }
  },

  changePassword: (req, res) => {
    const { id_user } = req.user.user
    try {
      const schema = joi.object({
        oldPassword: joi.string().required(),
        newPassword: joi.string().required(),
        confirmPassword: joi.string().required()
      })

      const { value, error } = schema.validate(req.body)
      const { oldPassword, newPassword, confirmPassword } = value
      if (error) {
        return response(res, `Schema: ${error}`, '', false)
      } else {
        getUserModel(id_user, result => {
          if (result) {
            const passwordFromDB = result[0].password
            const comparePassword = bcrypte.compareSync(oldPassword, passwordFromDB)
            if (comparePassword) {
              if (newPassword === confirmPassword) {
                const salt = bcrypte.genSaltSync(10)
                const hash = bcrypte.hashSync(newPassword, salt)
                changePasswordModel([id_user, hash], changed => {
                  if (changed.affectedRows > 0) {
                    return response(res, 'Password has been changed', '', true)
                  } else {
                    return response(res, 'SQL Error: Fail to change password', '', false)
                  }
                })
              } else {
                return response(res, 'Confirm password must be same with new password', '', false)
              }
            } else {
              return response(res, 'Your old password is unvalid!', '', false)
            }
          } else {
            return response(res, 'User not found', '', false)
          }
        })
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  },

  // ----------------------------------------------------------------------------

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
          return response(res, 'Updated success', data, true)
        } else {
          return response(res, 'Updated fail', '', false)
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
          return response(res, 'Updated success', { ...req.body }, true)
        } else {
          return response(res, 'Updated fail', '', false)
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
          return response(res, 'Data has been added', { data }, true)
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
        if (result !== null && result.affectedRows > 0) {
          const data = { ...req.body }
          // console.log(data)
          return response(res, 'Your address has been updated', { data }, true)
        } else {
          return response(res, 'Fail to update address, please fill in correctly', '', false)
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
