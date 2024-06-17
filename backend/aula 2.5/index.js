/**
 * Gravação de logs com Winston Module
 */

import express, { json } from "express";
import winston, { format } from "winston";

const app = express();

app.use(express.json());

const { printf, combine, label, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
	level: "silly",
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "my-log.log" }),
	],
  format: combine(
    label({ label: "my-app" }),
    timestamp(),
    myFormat
  ),
});

logger.error("Error Loging")
logger.warn("Warn Loging")
logger.info("Info Loging")
logger.verbose("Verbose Loging")
logger.log('silly', 'teste')



app.listen(8080, () => {
	console.log("API Started");
});
