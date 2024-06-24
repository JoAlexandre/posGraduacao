import sequelize from "sequelize";
import db from "../repository/db.js";
import Autor from "./autor.model";

const Livro = db.define('Livro', {
  livro_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nome: {
    type: sequelize.STRING,
    allowNull: false
  },
  valor: {
    type: sequelize.DOUBLE,
    allowNull: false
  },
  estoque: {
    type: sequelize.INTEGER,
    allowNull: false
  },
}, { underscored: true })

Livro.belongsTo(Autor, {foreignKey:'autor_id'})

export default Livro