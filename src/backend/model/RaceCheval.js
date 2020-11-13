const Sequelize = require("sequelize")
const db = require("../db.js")

module.exports = db.sequelize.define(
  'race_cheval',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    nom: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: 0,
    freezeTableName: 1,
    underscored: true,
    camelCase: false
  }
)
