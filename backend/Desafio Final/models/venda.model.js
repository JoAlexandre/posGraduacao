import sequelize from "sequelize";
import db from "../repository/db.js";
import Client from "./client.model";
import Livro from "./livro.model";

const Venda = db.define('Venda', {
  venda_id: {
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

Venda.belongsTo(Client, {foreignKey:'client_id'})
Venda.belongsTo(Livro, {foreignKey:'livro_id'})
export default Venda