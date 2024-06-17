const {DataTypes} = require('sequelize')
const sequelize = require('../repository/db.js')
const Clients = require('./clients.model.js')

const Consulta = sequelize.define("consulta", {
  emissao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  qtde_prestacoes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  juros: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  montante: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  prestacoes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { underscored: true })


Consulta.belongsTo(Clients, { foreignKey: 'client_cpf' })
Clients.hasMany(Consulta, {as: 'Consultas'})


module.exports = Consulta