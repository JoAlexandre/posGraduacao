import express from "express";
import { promises as fs } from "fs";
import carrosRouter from './carrosRouter.js'

const app = express();

app.use((req, res, next) => {
	console.log(`${new Date().toLocaleString()} - ${req.method.toUpperCase()} ${req.path}`);
	try {
		fs.appendFile("./log.txt",`\n${new Date().toLocaleString()} - ${req.method.toUpperCase()} ${req.path} - ${req.ip}`);
	} catch (error) {
		console.dir(error);
	}
	next();
});

app.use(express.json());


//middleware a nivel da rota
app.use('/carros', carrosRouter)


//middleware a nivel da aplicação

app.get("/test", (req, res) => {
	res.end();
});

app.get("*", (req, res) => {
	res.send("Not Found");
});
app.listen(8080, () => {
	console.log("API is listenning");
});
