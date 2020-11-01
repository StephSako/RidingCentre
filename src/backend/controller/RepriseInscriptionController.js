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
    if (!_.isEmpty(reprises)) return res.json(_.map(reprises, function(reprise) { return reprise.id_reprise; }))
    else res.json([])
  }).catch(err => {
    res.send("error : " + err)
  })
})

// ALL REGISTERED USER FOR A SPECIFIC REPRISE
reprise_inscription.get('/reprise/:id_reprise', (req, res) => {
  const id_reprise = req.params.id_reprise;

  RepriseInscription.findAll({
    where: {
      id_reprise: id_reprise
    },
    include: ['user', 'cheval']
  }).then(users => {
    if (!_.isEmpty(users)){
      return res.json(_.map(users, function(data) {
        return {
          id_reprise_inscription: data.dataValues.id,
          user: {
            id_user: data.user.dataValues.id_user,
            firstname_user: data.user.dataValues.firstname_user,
            lastname_user: data.user.dataValues.lastname_user
          },
          cheval:
            (!data.cheval ? [] :
              [
                {
                  id_cheval: data.cheval.dataValues.id_cheval,
                  nom: data.cheval.dataValues.nom,
                  race: data.cheval.dataValues.race,
                  age: data.cheval.dataValues.age,
                }
              ]
            )

        };
      }))
    }
    else res.json([])
  }).catch(err => {
    res.send("error : " + err)
  })
})

// REGISTER
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
        id_cheval: null
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

// EDIT
reprise_inscription.put('/edit/:id_reprise_inscription', (req, res) => {
  const id_reprise_inscription = req.params.id_reprise_inscription;
  const reprise_inscription = {
    id_user: req.body.id_user,
    id_reprise: req.body.id_reprise,
    id_cheval: (req.body.id_cheval ? req.body.id_cheval : null)
  }

  RepriseInscription.update(reprise_inscription, {
    where: { id: id_reprise_inscription}
  }).then(num => {
    if (num == 1) res.json({message: "Inscription mise à jour"})
    else if (num < 1) res.json({message: "L'inscription n'existe pas"})
  }).catch(err => {
    res.json({message: err/*"Une erreur est survenue lors de la mise à jour de l'inscription"*/})
  })
})

module.exports = reprise_inscription
