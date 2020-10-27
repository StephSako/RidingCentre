const Sequelize = require("sequelize")
const db = require("../db.js")

module.exports = db.sequelize.define(
  'reprise_inscription',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    id_reprise: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    freezeTableName: 1
  }
)
