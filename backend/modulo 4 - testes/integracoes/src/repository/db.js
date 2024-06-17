const { Sequelize } = require("sequelize");

// const db = new Sequelize(
//   {
//   dialect: 'postgres',
//   define: {
//     timestamps: false
//   },
//   database: 'financas',
//   host: 'pg-1cd0490-joseadoes-05ec.h.aivencloud.com',
//   port: 15294,
//   username: 'avnadmin',
//   password: "AVNS_i6QGRfSn25Jc5uNoYGT",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// });
const db = new Sequelize({
  dialect: 'postgres',
  database: 'consulta_credito',
  host: 'localhost',
  port: 32770,
  username: 'postgres',
  password: "mysecretpassword",
  logging: false
});

module.exports = db
