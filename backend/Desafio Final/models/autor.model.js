import sequelize from "sequelize";
import db from "../repository/db.js";

const Autor = db.define('Autor', {
  autorId: {
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
  telefone: {
    type: sequelize.STRING,
    allowNull: false
  },
}, {underscored: true})

export default Autor