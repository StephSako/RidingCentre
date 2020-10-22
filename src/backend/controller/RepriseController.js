const express = require('express')
const reprise = express.Router()
const Reprise = require("../model/Reprise")

// CREATE
reprise.post('/create', (req, res) => {
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
reprise.get('/details/:id_reprise', (req, res) => {
  let id_reprise = req.params.id_reprise

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

// ALL
reprise.get('/', (req, res) => {
  let id_reprise = req.params.id_reprise

  Reprise.findAll({}).then(reprises => {
    if (reprises) res.json(reprises)
    else res.send("Il n'y a pas de reprises")
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
