const Sequelize = require("sequelize")
const db = require("../db.js")

module.exports = db.sequelize.define(
  'user',
  {
    id_user: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname_user: {
      type: Sequelize.STRING
    },
    lastname_user: {
      type: Sequelize.STRING
    },
    role_user: {
      type: Sequelize.INTEGER
    },
    password_user: {
      type: Sequelize.STRING
    },
    email_user: {
      type: Sequelize.STRING,
      unique: true
    },
    license_number_user: {
      type: Sequelize.STRING
    },
    phone_number_user: {
      type: Sequelize.STRING,
      unique: true
    }
  },
  {
    timestamps: false,
    freezeTableName: 1
  }
)
