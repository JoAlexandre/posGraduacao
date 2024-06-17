import express from "express";
const app = express();

//informar ao express que se deseja utilizar o json no body da requisição
app.use(express.json());

/**
 * Metodo all habilita uma unica rota para todos os metodos/verbos HTTP!
 */
app.all("/testAll", (req, res) => {
	res.send("Hello World! -> " + req.method);
});

/**
 * Caracteres especiais nas uris
 * '?' -> a ultima letra seja opcional, /teste ou /test
 * '+' -> a ultima letra pode ser repetida varias vezes na requisicao, /buzz ou /buzzzzzzz
 * '()' -> trata a palavra como uma unica unidade. /test(ing), significa /testing
 * nesse caso, podemos utilizar todos os caracteres em conjunto
 */
app.get("/teste?", (req, res) => {
	res.send("/teste?");
});
app.get("/buzz+", (req, res) => {
	res.send("/buzz?");
});

app.get("/one*blue", (req, res) => {
	res.send(req.path);
});
app.get("/parenteses(ing)?", (req, res) => {
	res.send("deu certo");
});

/**
 * Parametros dentro da rota e no body da requisicao
 *
 */

app.post("/testePost", (req, res) => {
	res.send(req.body);
});

// parametros na rota
app.get("/getParams/:id?/:number?", (req, res) => {
	res.send(req.params);
});

// expressao regular
app.get(/red$/, (req, res) => {
	res.send(req.path);
});

//parametros via queryString
///get-query-string?nome=jose&idade=26&admin=false
app.get("/get-query-string", (req, res) => {
	res.send(req.query);
});

//next()
app.get(
	"/teste-multiple-handlers",
	(req, res, next) => {
		console.log("callback 1");
		next();
	},
	(req, res, next) => {
		console.log("callback 2");
		res.end(); //finalização da consulta no endpoin sem resposta
	}
);

// next() com arrays
const callback1 = (req, res, next) => {
	console.log("callback 1");
	next();
};
const callback2 = (req, res, next) => {
	console.log("callback 2");
	next();
};
const callback3 = (req, res, next) => {
	console.log("callback 3");
	console.log("fim do codigo");
	res.end();
};

app.get("/next-com-arrays", [callback1, callback2, callback3]);

// metodo route() -> responde a mesma rota com suas demais paths

app
	.route("/rota-a")
	.get((req, res) => {
		res.send(`${req.method.toUpperCase()} /rota-a`);
	})
	.post((req, res) => {
		res.send(`${req.method.toUpperCase()} /rota-a`);
	})
	.delete((req, res) => {
		res.send(`${req.method.toUpperCase()} /rota-a`);
	});

app.listen(8080, () => {
	console.log("Api has started!");
});
