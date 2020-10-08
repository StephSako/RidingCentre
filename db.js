let mysql = require('mysql')
let database = mysql.createPool({
  host: 'mysql-stephsako.alwaysdata.net',
  user: 'stephsako',
  password: 'jesuis95etgta#',
  database: 'stephsako_web_5a'
})

module.exports = database
module.exports.database = database
