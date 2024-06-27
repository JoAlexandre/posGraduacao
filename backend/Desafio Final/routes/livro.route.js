import express from "express";
import LivroCrontroller from "../controllers/livro.crontroller.js";
const router = express.Router();

router.post("/", LivroCrontroller.createLivro);
router.put("/", LivroCrontroller.updateLivro);
router.get("/", LivroCrontroller.getLivros);
router.get("/:id", LivroCrontroller.getLivro);
router.delete("/:id", LivroCrontroller.deleteLivro);

router.post("/info", LivroCrontroller.createLivroInfo);
router.put("/info", LivroCrontroller.updateLivroInfo);
router.delete("/info/:id", LivroCrontroller.deleteLivroInfo);
router.post("/:id/avaliacao", LivroCrontroller.createAvaliacao);
router.delete("/:id/avaliacao/:index", LivroCrontroller.deleteAvaliacao);
router.all("*", (req, res) => res.send("Page not Found"));

export default router;
