const express = require('express')
const user = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../model/User")
const RoleUser = require("../model/RoleUser")
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
const btoa = require('btoa');
const atob = require('atob');


process.env.SECRET_KEY = 'secret'

// REGISTER
user.post('/register', (req, res) => {
  const userData = {
    firstname_user: req.body.firstname_user,
    lastname_user: req.body.lastname_user,
    password_user: req.body.password_user,
    license_number_user: req.body.license_number_user,
    phone_number_user: req.body.phone_number_user,
    role_user_id: req.body.role_user_id,
    email_user: req.body.email_user
  }

  userData.password_user = bcrypt.hashSync(userData.password_user, 12)
  User.create(userData).then(user => {
    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 })
    res.json({token: token})
  }).catch(err => {
    if (err.parent.errno === 1062 && err.errors[0].path === "index_phone_number_unique") res.status(401).send("Le numéro de télephone est déjà lié un compte existant")
    else if (err.parent.errno === 1062 && err.errors[0].path === "email_user_unique") res.status(401).send("L'adresse email est déjà lié un compte existant")
    else res.status(401).send("Une erreur est survenue dans la mise à jour du compte")
  })
})

// LOGIN
user.post('/login', (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [
        { email_user: req.body.login_user },
        { phone_number_user: req.body.login_user }
      ]
    },
    include: [RoleUser]
  }).then(user => {
    if (bcrypt.compareSync(req.body.password_user, user.password_user)) {
      let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.json({token: token})
    } else res.status(401).send("Le mot de passe est incorrect")
  }).catch(() => {
    res.status(500).send("Aucun compte associé à cet idenfitiant")
  })
})

// PROFILE
user.get('/profile', (req, res) => {
  let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id_user: decoded.id_user
    },
    include: [RoleUser]
  }).then(user => {
    if (user) res.send(user)
    else res.json({message: "Cet utilisateur est introuvable"})
  }).catch(err => {
    res.json({message: err})
  })
})

// EDIT
user.put('/edit/:id_user', (req, res) => {
  const id_user = req.params.id_user;

  User.update(req.body, {
    where: { id_user: id_user}
  }).then(num => {

    if (num =! 0) {
      User.findOne({
        where: {
          id_user: id_user
        },
        include: [RoleUser]
      }).then(user => {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({token: token})
      }).catch(() => {
        res.status(500).send("Le compte modifié n'a pas été trouvé")
      })
    }
    else res.status(401).send("Le compte n'a pas été modifié")

  }).catch(err => {
    if (err.parent.errno === 1062 && err.errors[0].path === "index_phone_number_unique") res.status(401).send("Le numéro de télephone a déjà été renseigné")
    else if (err.parent.errno === 1062 && err.errors[0].path === "email_user_unique") res.status(401).send("L'adresse email a déjà été renseignée")
    else res.status(401).send("Une erreur est survenue dans la mise à jour du compte")
  })
})

// DELETE ACCOUNT
user.delete('/delete/:id_user', (req, res) => {
  const id_user = req.params.id_user

  User.findOne({
    where: {
      id_user: id_user,
    }
  }).then(user => {
    if (user){
      user.destroy();
      res.json({message: "Compte supprimé avec succès"})
    }
    else res.json({message: "Ce compte n'existe pas"})
  }).catch(err => {
    res.json({error: err})
  })
})

// SEND EMAIL TO RESET PASSWORD
user.post('/retrieve/password', (req, res) => {
  const emailValue = req.body.email_user
  console.log(emailValue)

  User.findOne({
    where: {
      email_user: emailValue
    }
  }).then(user => {
    if (user){
      const transporter = nodemailer.createTransport({
        host: 'smtp-stephsako.alwaysdata.net',
        port: 587,
        secure: false,
        tls:{
          rejectUnauthorized: false
        },
        auth: {
          user: 'stephsako@alwaysdata.net',
          pass: 'emailalwaysfromdata79YY97'
        }
      });

      const mailOptions = {
        from: '"No-reply - Centre équestre" <stephsako@alwaysdata.net>',
        to: '<' + emailValue + '>',
        subject: 'Récupération de mot de passe',
        html: 'Bonjour,<br><br>Vous avez demandé à modifier votre mot de passe.<br>Cliquez sur le lien pour accéder au formulaire : <a href=http://localhost:4200/reset-mot-de-passe/' + btoa(emailValue) + '>Réinitialiser son mot de passe</a><br><br>Merci dene pas répondre à ce mail.'
      };

      transporter.sendMail(mailOptions, function(){
        res.status(204).send("Email envoyé")
      });
    }
    else res.status(400).send("Cette adresse email n'est pas enregistrée")
  }).catch(() => {
    res.status(400).send("L'adresse email n'a pas pu être cherchée")
  })
})

// EDIT USER PASSWORD WITH CRYPTED MAIL IN PARAMETER
user.put('/edit/password/:email_user', (req, res) => {
  const decrypted_email_user = atob(req.params.email_user)
  const password_user = {
    password_user: bcrypt.hashSync(req.body.password_user, 12)
  }

  User.update(password_user, {
    where: { email_user: decrypted_email_user}
  }).then(() => {
    res.status(204).send("Le mot de passe a été modifié avec succès !")
  }).catch(() => {
    res.status(401).send("Mot de passe non modifié")
  })
})

// ALL INSTRUCTOR
user.get('/instructors', (req, res) => {
  User.findAll({
    where:{
      role_user_id: 2
    }
  }).then(moniteurs => {
    if (moniteurs) res.json(moniteurs)
    else res.send("Il n'y a pas de moniteur")
  }).catch(() => {
    res.send("Les moniteurs n'ont pas pu être récupérés")
  })
})

// ALL ACCOUNTS
user.get('/', (req, res) => {
  User.findAll({
    where:{
      [Op.not]: [
        { role_user_id: 4 }
      ]
    },
    order: [
      ['lastname_user', 'ASC']
    ],
    include: [RoleUser]
  }).then(moniteurs => {
    if (moniteurs) res.json(moniteurs)
    else res.send("Il n'y a pas d'administrateurs")
  }).catch(err => {
    res.send("error : " + err)
  })
})

// EDIT ACCOUNT'S ROLE
user.put('/edit/role/:id_user', (req, res) => {
  const id_user = req.params.id_user;
  User.update(req.body, {
    where: {
      id_user: id_user
    }
  }).then(num => {

    if (num =! 0) {
      User.findOne({
        where: {
          id_user: id_user
        },
        include: [RoleUser]
      }).then(user => {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({token: token})
      }).catch(() => {
        res.status(500).send("Le compte demandé n'a pas été trouvé")
      })
    }
    else res.status(401).send("Le rôle du compte n'a pas été modifié")

  }).catch(err => {
    res.status(401).send("Le rôle demandé n'a pas été trouvé")
  })
})

module.exports = user
