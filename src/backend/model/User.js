let db = require('../../../db')

let Etudiant = {
  inscription: function (callback, user) {
    return db.query('INSERT INTO user SET ?', user, callback)
  },
  connexion: function (callback, email) {
    return db.query('SELECT * FROM user WHERE email_user = ?', [email], callback)
  },
  list: function (callback) {
    return db.query('SELECT * FROM user', callback)
  }
}

module.exports = Etudiant
