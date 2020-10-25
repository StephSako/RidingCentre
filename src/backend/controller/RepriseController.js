const express = require('express')
const reprise_router = express.Router()
const Reprise = require("../model/Reprise")

// CREATE
reprise_router.post('/create', (req, res) => {
  const repriseData = {
    date: req.body.date,
    hour: req.body.hour,
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
reprise_router.get('/details/:id_reprise', (req, res) => {
  let id_reprise = req.params.id_reprise

  Reprise.findOne({
    where: {
      id: id_reprise
    }
  }).then(reprise => {
    if (reprise) res.json(reprise)
    else res.send("La reprise n'existe pas")
  }).catch(err => {
    res.send("error : " + err)
  })
})

// ALL
reprise_router.get('/', (req, res) => {
  Reprise.findAll({}).then(reprises => {
    if (reprises) res.json(reprises)
    else res.send("Il n'y a pas de reprises")
  }).catch(err => {
    res.send("error : " + err)
  })
})

// DELETE
reprise_router.get('/delete/:id_reprise', (req, res) => {
  let id_reprise = parseInt(req.params.id_reprise, 10)

  Reprise.findOne({
    where: {
      id: id_reprise
    }
  }).then(reprise => {
    if (reprise){
      reprise.destroy();
      res.json({message: "La reprise a été supprimée"})
    }
    else res.json({message: "La reprise n'existe pas"})
  }).catch(err => {
    res.json({error: err})
  })
})


// EDIT
/*reprise_router.post('/edit', (req, res) => {
  console.log('not created yet')
})*/

module.exports = reprise_router
