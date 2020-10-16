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
    role_user: 1,
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

//LOGIN
user.post('/login', (req, res) => {
  User.findOne({
    where: {
      email_user: req.body.email_user
    }
  }).then(user => {
    if (bcrypt.compareSync(req.body.password_user, user.password_user)) {
      let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.json({token: token})
    } else res.send("Ce compte n'est pas enregistré")
  }).catch(err => {
    res.send('error : ' + err)
  })
})

//PROFILE
user.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id_user: decoded.id_user
    }
  }).then(user => {
    if (user) res.json(user)
    else res.send("L'utilisateur n'existe pas")
  }).catch(err => {
    res.send('error : ' + err)
  })
})

module.exports = user
