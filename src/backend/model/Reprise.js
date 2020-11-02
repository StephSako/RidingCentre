const Sequelize = require("sequelize")
const db = require("../db.js")

module.exports = db.sequelize.define(
  'reprise',
  {
    id_reprise: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: Sequelize.DATE
    },
    rider_number_limit: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    galop_level: {
      type: Sequelize.INTEGER
    },
    canceled: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false,
    freezeTableName: 1
  }
)
