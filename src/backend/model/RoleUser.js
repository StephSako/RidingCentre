const Sequelize = require("sequelize")
const db = require("../db.js")

module.exports = db.sequelize.define(
  'role_user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: Sequelize.STRING
    }
  },
  {
    timestamp: 0,
    updatedAt: 0,
    createdAt: 0,
    freezeTableName: 1
  }
)
