import express from "express";
import AutorCrontroller from "../controllers/autor.crontroller.js";
const Router = express.Router();

Router.post("/", AutorCrontroller.createAutor);
Router.put("/", AutorCrontroller.updateAutor);
Router.get("/", AutorCrontroller.getAutors);
Router.get("/:id", AutorCrontroller.getAutor);
Router.delete("/:id", AutorCrontroller.deleteAutor);
Router.all("*", (req, res) => res.send("Page not Found"));

export default Router;
