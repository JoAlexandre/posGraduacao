import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("GET /carros");
});
router.get("/precos", (req, res) => {
	res.json("GET " +req.originalUrl);
});

router.get("*", (req, res) => {
	res.status(500).send("GET ");
});


export default router