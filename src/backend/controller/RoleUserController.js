const express = require('express')
const roleUser = express.Router()
const _ = require('lodash');
const RoleUser = require("../model/RoleUser")

// ALL ROLES
roleUser.get('/', (req, res) => {
  RoleUser.findAll().then(roles => {
    if (roles) res.json(roles)
    else res.send("Il n'y a pas de rôles définis")
  }).catch(err => {
    res.send("error : " + err)
  })
})

// CREATE ADMIN OR INSTRUCTOR ACCOUNT
roleUser.get('/list/admin', (req, res) => {
  RoleUser.findAll({
    where: {
      id: [2,3]
    }
  }).then(roles => {
    if (roles) res.json(roles)
    else res.send("Il n'y a pas de rôles définis")
  }).catch(err => {
    res.send("error : " + err)
  })
})

module.exports = roleUser
