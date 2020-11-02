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
  const id_reprise = req.params.id_reprise

  Reprise.findOne({
    where: {
      id_reprise: id_reprise
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
reprise_router.delete('/delete/:id_reprise', (req, res) => {
  const id_reprise = req.params.id_reprise

  Reprise.findOne({
    where: {
      id_reprise: id_reprise
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
reprise_router.put('/edit/:id_reprise', (req, res) => {
  const id_reprise = req.params.id_reprise;

  Reprise.update(req.body, {
    where: {
      id_reprise: id_reprise
    }
  }).then(num => {
    if (num == 1) res.json({message: "La reprise a été mise à jour"})
    else res.json({message: "La reprise n'a été mise à jour"})
  }).catch(err => {
    res.json({message: "Une erreur est survenue dans la mise à jour de la reprise"})
  })
})

module.exports = reprise_router
