let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
router.use(bodyParser.json())
let User = require('../model/User')

router.post('/connexion', function (req, res) {
  let input = req.body
  let email = input.email_user
  let password = input.password_user
  User.connexion(function (err, rows) {
    if (err) throw err;
    if (rows.length === 1) {
      if (password === rows[0].password_user) {
        req.session.id_user = rows[0].id_user
        req.session.email_user = rows[0].email_user
        req.session.lastname_user = rows[0].lastname_user
        req.session.firstname_user = rows[0].firstname_user
        req.session.role_user = rows[0].role_user
        req.session.license_number_user = (rows[0].license_number_user ? rows[0].license_number_user : "")
        req.session.phone_number_user = rows[0].phone_number_user
        res.json({
            auth: true,
            id_user: req.session.id_user,
            firstname_user: req.session.firstname_user,
            lastname_user: req.session.lastname_user,
            role_user: req.session.role_user,
            email_user: req.session.email_user,
            license_number_user: req.session.license_number_user,
            phone_number_user: req.session.phone_number_user
          }
        )
      } else {
        res.json(
          {
            auth: false,
            message: 'Le mot de passe est incorrect.'
          }
        )
      }
    } else {
      res.json({
        auth: false,
        message: 'Cette adresse email n\'est pas enregistrée.'
      })
    }
  }, email)
})

router.post('/inscription', function (req, res) {
  let input = req.body
  let etudiant = {
    firstname_user: input.firstname_user,
    lastname_user: input.lastname_user,
    password_user: input.password_user,
    license_number_user: input.license_number_user,
    phone_number_user: input.phone_number_user,
    email_user: input.email_user,
  }

  User.inscription(function (err, rowsEtudiant) {
    if (err){
      res.json(
        {
          auth: false,
          message: 'L\'email saisi a déjà été renseigné par un autre utilisateur.'
        }
      )
    }
    else {
      req.session.id_user = rowsEtudiant.insertId
      req.session.email_user = input.email_user
      req.session.firstname_user = input.firstname_user
      req.session.lastname_user = input.lastname_user
      req.session.role_user = 'etudiant'
      req.session.license_number_user = input.license_number_user
      res.json(
        {
          auth: true,
          id_user: req.session.id_user,
          firstname_user: req.session.firstname_user,
          lastname_user: req.session.lastname_user,
          license_number_user: req.session.license_number_user,
          role_user: req.session.role_user,
          message: 'L\'inscription est terminée.'
        }
      )
    }
  }, etudiant)
})

router.get('/list', function (req, res) {
  User.list(function (err, rows) {
    if (err) throw err
    console.log(rows)
    res.json({

    })
  })
})

module.exports = router
