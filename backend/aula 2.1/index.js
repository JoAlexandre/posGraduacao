import express from "express";

const app = express();

function soma(a, b) {
	return a + b;
}

app.get("/", (req, res) => {
	res.send(`<h2>Hello World</h2>`);
});

app.post("/", (req, res) => {
	const a = 3;
	const b = 5;
	const resultado = soma(a, b);
	res.send(`Resultado: ${resultado}`);
});

app.listen(8080, () => {
	console.log("API has started!");
});
