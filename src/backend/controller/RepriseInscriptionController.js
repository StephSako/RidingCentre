const express = require('express')
const reprise_inscription = express.Router()
const RepriseInscription = require("../model/RepriseInscription")
const _ = require('lodash');

// ALL REGISTERED REPRISE FOR A SPECIFIC USER
reprise_inscription.get('/user/:id_user', (req, res) => {
  const id_user = req.params.id_user;

  RepriseInscription.findAll({
    where: { id_user: id_user}
  }).then(reprises => {
    console.log(reprises)
    if (!_.isEmpty(reprises)) return res.json(_.map(reprises, function(reprise) { return reprise.id_reprise; }))
    else res.json([])
  }).catch(err => {
    res.send("error : " + err)
  })
})

// CREATE
reprise_inscription.post('/register', (req, res) => {
  RepriseInscription.count({
    where: {
      id_reprise: req.body.id_reprise,
      id_user: req.body.id_user
    }
  }).then(count => {
    if (count === 0) {
      const repriseInscriptionData = {
        id_user: req.body.id_user,
        id_reprise: req.body.id_reprise,
      }

      RepriseInscription.create(repriseInscriptionData).then(repriseInscription => {
        res.json({reprise_registered: repriseInscription})
      }).catch(err => {
        res.send('error : ' + err)
      })
    }
    else res.json({message: "Vous êtes déjà inscrit pour ce cours"})
  }).catch(err => {
    res.send('error : ' + err)
  });

})

// UNREGISTER
reprise_inscription.delete('/delete/user/:id_user/reprise/:id_reprise', (req, res) => {
  const id_reprise = req.params.id_reprise
  const id_user = req.params.id_user

  RepriseInscription.findOne({
    where: {
      id_reprise: id_reprise,
      id_user: id_user
    }
  }).then(reprise_inscription => {
    if (reprise_inscription){
      reprise_inscription.destroy();
      res.json({message: "Vous vous êtes désinscrit de la reprise"})
    }
    else res.json({message: "Cet enregistrement n'existe pas"})
  }).catch(err => {
    res.json({error: err})
  })
})

module.exports = reprise_inscription
