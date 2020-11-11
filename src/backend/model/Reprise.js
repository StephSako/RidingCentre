const Sequelize = require("sequelize")
const db = require("../db.js")

module.exports = db.sequelize.define(
  'reprise',
  {
    id_reprise: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    date: {
      type: Sequelize.INTEGER // timestamp type
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
    },
    user_id_user: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
    freezeTableName: 1,
    underscored: true,
    camelCase: false
  }
)
