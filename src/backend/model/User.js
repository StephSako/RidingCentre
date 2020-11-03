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
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname_user: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password_user: {
      type: Sequelize.STRING
    },
    email_user: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    license_number_user: {
      type: Sequelize.STRING
    },
    phone_number_user: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    role_user_id: {
      type: Sequelize.NUMBER
    }
  },
  {
    timestamps: false,
    freezeTableName: 1,
    underscored: true,
    camelCase: false
  }
)
