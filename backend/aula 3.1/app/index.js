/**
 * Desenvolvimento de apis -> my-bank-api
 * controlar accounts -> {id (unique), name, balance}
 * criação, depósito, saque, saldo e exclusão
 */
import express from "express";
import { readJson, writeOnJson } from "./helpers.js";
import accounts from "./routes/account.routes.js";
import winston from "winston";
import basicAuth from "express-basic-auth";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${new Date().toLocaleString(
		"pt-br"
	)} [${label} ${level}: ${message}]`;
});

global.logger = winston.createLogger({
	level: "silly",
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "my-bank-api.log" }),
	],
	format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

const app = express();

const port = process.env.PORT || 8080;
app.use(express.json());

// app.use(
// 	basicAuth({
// 		users:{'admin':'admin'}
// 	})
// );
app.use(
	basicAuth({
		authorizer: (username, password) => {
			const userMatches = basicAuth.safeCompare(username, "admin");
			const pwdMatches = basicAuth.safeCompare(password, "admin");
			const userMatches1 = basicAuth.safeCompare(username, "jose");
			const pwdMatches1 = basicAuth.safeCompare(password, "1234");
			return userMatches && pwdMatches || userMatches1 && pwdMatches1 ;
		},
	})
);

function getRole(username) {
	if (username === "admin") {
		return "admin";
	}
	if (username === "jose") {
		return "role1";
	}
}

function autorize(...allowed) {
	const isAllowed = (role) => allowed.indexOf(role) > -1;
	return (req, res, next) => {
		if (req.auth.user) {
			const role = getRole(req.auth.user);
			if (isAllowed(role)) {
				next();
			} else {
				res.status(401).send("Role not allowed");
			}
		} else {
			res.status(403).send("User not found");
			
		}
	};
}

app.use("/accounts", autorize("admin"), accounts);

app.listen(port, async () => {
	const initialJson = {
		nextId: 1,
		accounts: [],
	};
	try {
		await readJson("accounts.json");
		logger.info("API has stated");
	} catch (error) {
		await writeOnJson("accounts.json", initialJson);
		logger.info("API has stated and created log files");
	}
});
