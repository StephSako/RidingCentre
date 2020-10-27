const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const app = express()

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

let UserController = require('./src/backend/controller/UserController')
app.use('/api/user', UserController)

let RepriseController = require('./src/backend/controller/RepriseController')
app.use('/api/reprise', RepriseController)

let RepriseInscriptionController = require('./src/backend/controller/RepriseInscriptionController')
app.use('/api/reprise_inscription', RepriseInscriptionController)

let port = process.env.PORT || 4000
app.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
