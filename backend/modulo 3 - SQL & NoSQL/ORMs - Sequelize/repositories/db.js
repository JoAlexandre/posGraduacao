import pg from 'pg' 
import fs from 'fs'
import { Sequelize } from 'sequelize'

// async function connect() {

//   if (global.connection) {
//     return global.connection.connect()
//   }
//   const pool = new pg.Pool({
//     // connectionString: "postgres://avnadmin:AVNS_i6QGRfSn25Jc5uNoYGT@pg-1cd0490-joseadoes-05ec.h.aivencloud.com:15294/defaultdb?sslmode=require",
//     database: 'defaultdb',
//     host: 'pg-1cd0490-joseadoes-05ec.h.aivencloud.com',
//     port: 15294,
//     user: 'avnadmin',
//     password:"AVNS_i6QGRfSn25Jc5uNoYGT",
//     ssl: {
//       // rejectUnauthorized: true,
//       require: true,
//       ca: fs.readFileSync('./repositories/cert.crt')

//     }
//   })
  
//   global.connection = pool
//   return pool.connect()
// }

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