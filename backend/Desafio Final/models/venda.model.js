import sequelize from "sequelize";
import db from "../repository/db.js";
import Client from "./client.model.js";
import Livro from "./livro.model.js";

const Venda = db.define('Venda', {
  vendaId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  valor: {
    type: sequelize.DOUBLE,
    allowNull: false
  },
  data: {
    type: sequelize.DATE,
    allowNull: false
  },
}, { underscored: true })

Venda.belongsTo(Client, {foreignKey:'clientId'})
Venda.belongsTo(Livro, {foreignKey:'livroId'})
export default Venda