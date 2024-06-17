import pg from 'pg' 
import fs from 'fs'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  {
    dialect: 'postgres',
    define: {
      timestamps: false // impede a criação dos campos created_at/update_at 
    },
    database: 'defaultdb',
    host: 'pg-1cd0490-joseadoes-05ec.h.aivencloud.com',
    port: 15294,
    username: 'avnadmin',
    password: "AVNS_i6QGRfSn25Jc5uNoYGT",
    dialectOptions: {
      ssl: {
        require:true,
        rejectUnauthorized: false
        
      }
    },
  } 
)

export default sequelize