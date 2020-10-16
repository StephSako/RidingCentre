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
      type: Sequelize.INTEGER,
      references: 'role_user',
      referencesKey: 'id'
    },
    password_user: {
      type: Sequelize.STRING
    },
    email_user: {
      type: Sequelize.STRING
    },
    license_number_user: {
      type: Sequelize.STRING
    },
    phone_number_user: {
      type: Sequelize.STRING
    },
    created_at_user: {
      field: 'created_at_user',
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at_user: {
      field: 'updated_at_user',
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamp: 0,
    updatedAt: 'updated_at_user',
    createdAt: 'created_at_user',
    freezeTableName: 1
  }
)
