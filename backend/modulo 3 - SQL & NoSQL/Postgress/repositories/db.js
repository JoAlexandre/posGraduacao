import pg from 'pg' 
import fs from 'fs'

async function connect() {

  if (global.connection) {
    return global.connection.connect()
  }
  const pool = new pg.Pool({
    // connectionString: "postgres://avnadmin:AVNS_i6QGRfSn25Jc5uNoYGT@pg-1cd0490-joseadoes-05ec.h.aivencloud.com:15294/defaultdb?sslmode=require",
    database: 'defaultdb',
    host: 'pg-1cd0490-joseadoes-05ec.h.aivencloud.com',
    port: 15294,
    user: 'avnadmin',
    password:"AVNS_i6QGRfSn25Jc5uNoYGT",
    ssl: {
      // rejectUnauthorized: true,
      require: true,
      ca: fs.readFileSync('./repositories/cert.crt')

    }
  })
  
  global.connection = pool
  return pool.connect()
}

export {
  connect
}