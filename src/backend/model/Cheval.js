const Sequelize = require("sequelize")
const db = require("../db.js")
const RaceCheval = require("../model/RaceCheval")

module.exports = db.sequelize.define(
  'cheval',
  {
    id_cheval: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    nom: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    race_cheval_id: {
      type: Sequelize.NUMBER,
      allowNull: false,
      references: {
        model: RaceCheval,
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: 1,
    underscored: true,
    camelCase: false
  }
)
