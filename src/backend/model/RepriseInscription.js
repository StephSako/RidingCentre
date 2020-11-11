const Sequelize = require("sequelize")
const db = require("../db.js")
const Reprise = require("../model/Reprise")
const User = require("../model/User")
const Cheval = require("../model/Cheval")

module.exports = db.sequelize.define(
  'reprise_inscription',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    id_reprise: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Reprise,
        key: 'id_reprise'
      }
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id_user'
      },
      allowNull: false
    },
    id_cheval: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Cheval,
        key: 'id_cheval'
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: 1
  }
)
