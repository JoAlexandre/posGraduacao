import express from "express";
import cors from "cors";
import winston from "winston";
import clientsRoute from "./routes/clients.route.js";
import suppliersRoute from "./routes/suppliers.route.js";
import productsRoute from "./routes/products.route.js";
import salesRoute from "./routes/sales.route.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${new Date().toLocaleString(
		"pt-br"
	)} [${label}] ${level} - ${message}`;
});

global.logger = winston.createLogger({
	level: "silly",
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "store-api.log" }),
	],
	format: combine(label({ label: "store-api" }), timestamp(), myFormat),
});

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/clients", clientsRoute);
app.use("/suppliers", suppliersRoute);
app.use("/products", productsRoute);
app.use("/sales", salesRoute);

app.use((err, req, res, next) => {
  global.logger.error(`${req.method.toUpperCase()} ${req.originalUrl} - ${err.message}`)
  res.status(400).send({error: err.message})
})


app.listen(port, () => {
	console.log("API has started on " + port);
});
