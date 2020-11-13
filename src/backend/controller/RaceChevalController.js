const express = require('express')
const raceCheval = express.Router()
const _ = require('lodash');
const RaceCheval = require("../model/RaceCheval")
const Cheval = require("../model/Cheval")

// ALL
raceCheval.get('/', (req, res) => {
  RaceCheval.findAll({
    order: [
      ['nom', 'ASC']
    ]
  }).then(raceChevaux => {
    if (raceChevaux) res.json(raceChevaux)
    else res.send("Il n'y a pas de races de chevaux")
  }).catch(err => {
    res.send("error : " + err)
  })
})

module.exports = raceCheval
