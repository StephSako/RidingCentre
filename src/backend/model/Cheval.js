const Sequelize = require("sequelize")
const db = require("../db.js")

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
    race: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    freezeTableName: 1
  }
)
