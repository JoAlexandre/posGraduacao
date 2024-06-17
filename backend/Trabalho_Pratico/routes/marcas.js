import express from "express";
import { modelosSorted, readJson } from "../helpers/jsonManipulation.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("GET /marcas");
});

router.get("/maisModelos", async (req, res) => {
	const modelos = await modelosSorted();
	const maiorModelo = modelos[modelos.length - 1].modelos;
	const maisModelos = modelos.filter((item) => item.modelos == maiorModelo);
	const maisModelosF = maisModelos.map((item) => item.marca);
	res.send(maisModelosF.length > 1 ? maisModelosF : maisModelosF.join());
});

router.get("/menosModelos", async (req, res, next) => {
	const modelos = await modelosSorted();

	const menorModelo = modelos[0].modelos;
	const menosModelos = modelos.filter((item) => item.modelos == menorModelo);
	const menosModelosF = menosModelos.map((item) => item.marca);
	res.send(menosModelosF.length > 1 ? menosModelosF : menosModelosF.join());
});

router.get("/listaMaisModelos/:id", async (req, res) => {
	const numberReceived = parseInt(req.params.id);
	if (/\D/g.test(numberReceived)) return res.status(500).send("o valor digitado não é um numeral");

	const modelos = await modelosSorted();
	const maisModelos = modelos.slice(
		modelos.length - numberReceived,
		modelos.length
	);
	console.log(modelos);
	res.send(
		maisModelos
			.reverse()
			.reduce((p, c) => [...p, `${c.marca} - ${c.modelos}`], [])
	);
});
router.get("/listaMenosModelos/:id", async (req, res) => {
	const numberReceived = parseInt(req.params.id);
	if (/\D/g.test(numberReceived)) return res.status(500).send("o valor digitado não é um numeral");

	const modelos = await modelosSorted();
	const maisModelos = modelos
		.sort((a, b) => a.modelos - b.modelos || a.marca.localeCompare(b.marca))
		.slice(0, numberReceived);
	res.send(
		maisModelos.reduce((p, c) => [...p, `${c.marca} - ${c.modelos}`], [])
	);
});

router.post("/listaModelos", async (req, res) => {
	if (!req.body.nomeMarca)
		return res.status(500).send("parameto não informado");

	const nomeMarca = req.body.nomeMarca.toLowerCase();
	const modelos = await readJson();
	const foundBrand =
		modelos.find((item) => item.brand.toLowerCase() == nomeMarca)?.models || [];
	res.send(foundBrand);
});

export default router;
