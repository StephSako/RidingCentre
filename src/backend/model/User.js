const Sequelize = require("sequelize")
const db = require("../db.js")

let User = db.sequelize.define(
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
    freezeTableName: 1,
    underscored: true,
    camelCase: false
  }
)

module.exports = User
