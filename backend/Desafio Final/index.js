import express from "express";
import db from "./repository/db.js";
import winston from "winston";
import clientRouter from './routes/client.route.js' 
import autorRouter from './routes/autor.route.js' 
import livroRouter from './routes/livro.route.js' 
const app = express();
const port_app = process.env.PORT_APP || 3002
app.use(express.json());

//logger
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level} - ${message}`;
});

global.logger = winston.createLogger({
	level: "silly",
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "livraria-api.log" }),
	],
	format: combine(label({ label: "livraria-api" }), timestamp(), myFormat),
});

app.use("/cliente", clientRouter)
app.use("/autor", autorRouter)
app.use("/livro", livroRouter)
 
app.use((err, req, res, next) =>{
  global.logger.error(`${req.method.toUpperCase()} ${req.originalUrl} - ${err.message}`)
	res.status(400).send({ error: err.message });
});
 

app.listen(port_app, async () => {
	// await db.sync();
	console.log(`Api Desafio Final is running at ${port_app}!`);
});
