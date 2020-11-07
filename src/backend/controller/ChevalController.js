const express = require('express')
const cheval = express.Router()
const Cheval = require("../model/cheval")
const { Op } = require("sequelize");
const _ = require('lodash');
const RepriseInscription = require("../model/RepriseInscription")

// CREATE
cheval.post('/create', (req, res) => {
  const chevalData = {
    nom: req.body.nom,
    age: req.body.age,
    race: req.body.race
  }

  Cheval.create(chevalData).then(cheval => {
    res.json({cheval: cheval})
  }).catch(err => {
    res.send('error : ' + err)
  })
})

// DETAILS
cheval.get('/details/:id_cheval', (req, res) => {
  const id_cheval = req.params.id_cheval

  Cheval.findOne({
    where: {
      id: id_cheval
    }
  }).then(cheval => {
    if (cheval) res.json(cheval)
    else res.send("La cheval n'existe pas")
  }).catch(err => {
    res.send("error : " + err)
  })
})

// ALL
cheval.get('/', (req, res) => {
  Cheval.findAll({}).then(chevaux => {
    if (chevaux) res.json(chevaux)
    else res.send("Il n'y a pas de chevaux")
  }).catch(err => {
    res.send("error : " + err)
  })
})

// DELETE
cheval.delete('/delete/:id_cheval', (req, res) => {
  const id_cheval = req.params.id_cheval

  Cheval.findOne({
    where: {
      id_cheval: id_cheval
    }
  }).then(cheval => {
    if (cheval){
      cheval.destroy();
      res.json({message: "Le cheval a été supprimé"})
    }
    else res.json({message: "Le cheval n'existe pas"})
  }).catch(err => {
    res.json({error: err})
  })
})


// EDIT
cheval.put('/edit/:id_cheval', (req, res) => {
  const id_cheval = req.params.id_cheval;

  Cheval.update(req.body, {
    where: { id: id_cheval}
  }).then(num => {
    if (num == 1) res.json({message: "Le cheval a été mis à jour"})
    else if (num < 1) res.json({message: "Le cheval n'existe pas"})
  }).catch(err => {
    res.json({message: "Une erreur est survenue lors de la mise à jour du cheval"})
  })
})

// AVAILABLE HORSES FOR A SPECIFIC REPRISE
cheval.get('/available_horses/reprise/:id_reprise', (req, res) => {
  const id_reprise = req.params.id_reprise;
  RepriseInscription.findAll({
    where: {
      id_reprise: id_reprise,
      id_cheval: {
        [Op.ne]: null
      }
    }
  }).then(chevaux => {
    let chevauxUnavailable = _.map(chevaux, function(cheval) { return cheval.id_cheval; })
    Cheval.findAll({
      where: {
        id_cheval: {
          [Op.notIn]: chevauxUnavailable
        }
      },
      order: [
        ['nom', 'ASC']
      ]
    }).then(chevaux => {
      return res.json(chevaux)
    }).catch(err => {
      res.send("error : " + err)
    })

  }).catch(err => {
    res.send(err)
  })
})

module.exports = cheval
