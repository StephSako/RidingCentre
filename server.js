const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const app = express()
const RoleUser = require("./src/backend/model/RoleUser")
const User = require("./src/backend/model/User")
const Cheval = require("./src/backend/model/Cheval")
const Reprise = require("./src/backend/model/Reprise")
const RepriseInscription = require("./src/backend/model/RepriseInscription")

app.use(session({
  secret: 'riding_center',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist/')))

app.get('/api', function (req, res) {
  res.json({ status: 'Working' })
})

// Associations for user's roles
RoleUser.hasMany(User)
User.belongsTo(RoleUser)

// Associations for reprise inscriptions
/*User.belongsToMany(Reprise, {
  foreignKey: 'id_user',
  through: RepriseInscription,
  as: 'reprises'
});
Reprise.belongsToMany(User, {
  foreignKey: 'id_reprise',
  through: RepriseInscription,
  as: 'users'
});
Cheval.belongsToMany(Reprise, {
  foreignKey: 'id_cheval',
  through: RepriseInscription,
  as: 'chevalsReprises'
});
Cheval.belongsToMany(User, {
  foreignKey: 'id_cheval',
  through: RepriseInscription,
  as: 'chevalsUsers'
});
User.belongsToMany(Cheval, {
  foreignKey: 'id_user',
  through: RepriseInscription,
  as: 'usersChevals'
});
Reprise.belongsToMany(Cheval, {
  foreignKey: 'id_reprise',
  through: RepriseInscription,
  as: 'reprisesChevals'
});*/

RepriseInscription.belongsTo(User, {
  foreignKey: 'id_user'
});
RepriseInscription.belongsTo(Reprise, {
  foreignKey: 'id_reprise'
});
RepriseInscription.belongsTo(Cheval, {
  foreignKey: 'id_cheval',
});

let UserController = require('./src/backend/controller/UserController')
app.use('/api/user', UserController)

let RepriseController = require('./src/backend/controller/RepriseController')
app.use('/api/reprise', RepriseController)

let RepriseInscriptionController = require('./src/backend/controller/RepriseInscriptionController')
app.use('/api/reprise_inscription', RepriseInscriptionController)

let ChevalController = require('./src/backend/controller/ChevalController')
app.use('/api/cheval', ChevalController)

let port = process.env.PORT || 4000
app.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
