const express = require('express')
const user = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../model/User")
const { Op } = require("sequelize");

process.env.SECRET_KEY = 'secret'

// REGISTER
user.post('/register', (req, res) => {
  const userData = {
    firstname_user: req.body.firstname_user,
    lastname_user: req.body.lastname_user,
    password_user: req.body.password_user,
    license_number_user: req.body.license_number_user,
    phone_number_user: req.body.phone_number_user,
    role_user: 1,
    email_user: req.body.email_user
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

// LOGIN
user.post('/login', (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [
        { email_user: req.body.login_user },
        { phone_number_user: req.body.login_user }
      ]
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

// PROFILE
user.get('/profile', (req, res) => {

  let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

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

// EDIT
user.post('/edit', (req, res) => {
  console.log('not created yet')
})

// DELETE
user.post('/delete', (req, res) => {
  console.log('not created yet')
})

module.exports = user
