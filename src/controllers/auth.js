/* eslint-disable camelcase */
const { loginModel, registerCustomerModel, registerSellerModel } = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const response = require('../helpers/respons')
const joi = require('joi')

module.exports = {
  login: (req, res) => {
    try {
      const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
      })

      const { value, error } = schema.validate(req.body)
      const { email, password } = value

      if (error) {
        return response(res, `Validate: ${error}`, '', false)
      } else {
        loginModel([email, password], result => {
          // console.log(user.email)
          // compare bycript
          if (result) {
            const data = {
              email,
              password
            }

            // cek password biasa dengan password db yang sudah di hash
            const check = bcrypt.compareSync(password, result.password)
            if (check === true) {
              const user = {
                id_user: result.id_user,
                name: result.name,
                email: result.email,
                id_role: result.id_role,
                gender: result.gender
              }
              const token = jwt.sign({ user }, process.env.APP_KEY)
              return response(res, 'Login success', { data, token }, true)
            } else {
              return response(res, 'Password incorrect', '', false)
            }
          } else {
            return response(res, 'Email incorrect', '', false)
          }
        })
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  },

  registerCustomer: (req, res) => {
    try {
      const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
      })

      const { value, error } = schema.validate(req.body)
      const { name, email, password } = value
      if (error) {
        return response(res, `Validate: ${error}`, '', false)
      } else {
        const id_role = 2

        // console.log(password)
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        // console.log(hashPassword)
        // if (name && email && password) {
        registerCustomerModel([id_role, name, email, hashPassword], result => {
          // console.log(result)
          if (result) {
            const data = {
              ...req.body,
              password: hashPassword
            }
            return response(res, 'register success', { data }, true)
          } else {
            return response(res, 'Email is already registered', '', false)
          }
        })
        // } else {
        //   return response(res, 'Columns cannot be empty', '', false)
        // }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  },

  registerSeller: (req, res) => {
    try {
      const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().required(),
        gender: joi.string().required(),
        date: joi.string().required()
      })

      const { value, error } = schema.validate(req.body)
      const { name, email, password, phone, gender, date } = value

      if (error) {
        return response(res, `Validate: ${error}`, '', false)
      } else {
        const id_role = 3

        // console.log(password)
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        // console.log(hashPassword)
        // if (id_role && name && email && password && phone && gender && date) {
        registerSellerModel([id_role, name, email, hashPassword, phone, gender, date], result => {
          // console.log(result)
          if (result) {
            const data = {
              ...req.body,
              password: hashPassword
            }
            return response(res, 'register success', { data }, true)
          } else {
            return response(res, 'Email is already registered', '', false)
          }
        })
        // } else {
        //   return response(res, 'Columns cannot be empty', '', false)
        // }
      }
    } catch (err) {
      return response(res, `Catch: ${err}`, '', false)
    }
  }
}
