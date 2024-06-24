import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: 'postgres',
  define: {
    timestamps: false
  },
  database: process.env.database,
  host: process.env.host,
  port: process.env.port,
  username: process.env.user,
  password: process.env.password,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export default db