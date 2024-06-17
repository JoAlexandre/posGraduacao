const { DataTypes } = require('sequelize')
const sequelize = require('../repository/db.js')

const Clients = sequelize.define("clients", {
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, { underscored: true })


module.exports = Clients