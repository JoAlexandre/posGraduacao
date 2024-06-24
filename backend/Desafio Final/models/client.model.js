import sequelize from "sequelize";
import db from "../repository/db.js";

const Client = db.define('Client', {
  clientId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nome: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: sequelize.STRING,
    allowNull: false
  },
  telefone: {
    type: sequelize.STRING,
    allowNull: false
  },
  endereco: {
    type: sequelize.STRING,
    allowNull: false
  },
}, {underscored: true})

export default Client