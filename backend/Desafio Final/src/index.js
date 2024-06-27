import express from "express";
import winston from "winston";
import clientRouter from "../routes/client.route.js";
import autorRouter from "../routes/autor.route.js";
import livroRouter from "../routes/livro.route.js";
import vendaRouter from "../routes/venda.route.js";
import basicAuth from "express-basic-auth";
import authorize from "../functions/authorizer.js";
import clientRepository from "../repository/client.repository.js";

const app = express();
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

app.get("/", (req, res) => res.send("hello world"));

app.use(
	basicAuth({
		authorizer: async (username, password, callback) => {

			if (username == 'admin') {
				const userMatch = basicAuth.safeCompare(username, 'admin')
				const passMatch = basicAuth.safeCompare(password, 'desafio-igti-nodejs')
				return callback(null, (userMatch && passMatch))
			}

			const user = await clientRepository.getClientByNameAndPassword({ email: username, senha: password })
			return callback(null, user)

		},
		unauthorizedResponse: 'Unauthorized',
		authorizeAsync: true
	})
)

app.use("/cliente", authorize("admin", "role1"), clientRouter);
app.use("/autor", authorize("admin", "role1"), autorRouter);
app.use("/livro", authorize("admin", "role1"), livroRouter);
app.use("/venda", authorize("admin", "role1"), vendaRouter);
app.use("*", authorize("admin", "role1"), (req, res) =>
	res.status(404).send("Página não encontrada")
);

app.use((err, req, res, next) => {
	global.logger.error(
		`${req.method.toUpperCase()} ${req.originalUrl} - ${err.message}`
	);
	res.status(400).send({ error: err.message });
});


export default app;
