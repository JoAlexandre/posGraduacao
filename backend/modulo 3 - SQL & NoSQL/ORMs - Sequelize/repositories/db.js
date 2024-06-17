import pg from 'pg' 
import fs from 'fs'
import { Sequelize } from 'sequelize'

// async function connect() {

//   if (global.connection) {
//     return global.connection.connect()
//   }
//   const pool = new pg.Pool({
//     database: process.env.database,
    // host: process.env.host,
    // port: process.env.port,
    // username: process.env.username,
    // password: process.env.password,
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
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    username: process.env.username,
    password: process.env.password,
    dialectOptions: {
      ssl: {
        require:true,
        rejectUnauthorized: false
        
      }
    },
  } 
)

export default sequelize