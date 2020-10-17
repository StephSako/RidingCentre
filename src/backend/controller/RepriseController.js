const express = require('express')
const reprise = express.Router()
const Reprise = require("../model/Reprise")

// REGISTER
reprise.post('/register', (req, res) => {
  const repriseData = {
    date: req.body.date,
    rider_number_limit: req.body.rider_number_limit,
    title: req.body.title,
    galop_level: req.body.galop_level
  }

  Reprise.create(repriseData).then(reprise => {
    res.json({reprise: reprise})
  }).catch(err => {
    res.send('error : ' + err)
  })
})

// DETAILS
reprise.post('/details', (req, res) => {
  let id_reprise = req.body.id_reprise

  Reprise.findOne({
    where: {
      id: id_reprise
    }
  }).then(reprise => {
    if (reprise) res.json(reprise)
    else res.send("La reprise n'existe pas")
  }).catch(err => {
    res.send('error : ' + err)
  })
})

// EDIT
/*reprise.post('/edit', (req, res) => {
  console.log('not created yet')
})

// PROFILE
reprise.get('/delete', (req, res) => {
  console.log('not created yet')
})*/

module.exports = reprise
