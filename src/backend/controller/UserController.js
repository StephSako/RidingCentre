const express = require('express')
const user = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../model/User")
user.use(cors())

process.env.SECRET_KEY = 'secret'

// REGISTER
user.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    firstname_user: req.body.firstname_user,
    lastname_user: req.body.lastname_user,
    password_user: req.body.password_user,
    license_number_user: req.body.license_number_user,
    phone_number_user: req.body.phone_number_user,
    email_user: req.body.email_user,
    created_at_user: today,
    updated_at_user: today
  }

  User.findOne({
    where: {
      email_user: req.body.email_user
    }
  })
    .then(user => {
      if (!user) {
        userData.password_user = bcrypt.hashSync(userData.password_user, 12)
        User.create(userData).then(user => {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.json({token: token})
        }).catch(err => {
          res.send('error : ' + err)
        })
      } else {
        res.json({error: "L'utilisateur est déjà enregistré !"})
      }
    }).catch(err => {
    res.send('error : ' + err)
  })
})

module.exports = user
