const Sequelize = require("sequelize")
const db = require("../db.js")

module.exports = db.sequelize.define(
  'reprise',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: Sequelize.DATE
    },
    hour: {
      type: Sequelize.TIME
    },
    rider_number_limit: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    galop_level: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    freezeTableName: 1
  }
)
