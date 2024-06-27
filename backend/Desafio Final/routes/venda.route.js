import express from "express";
import VendaCrontroller from "../controllers/venda.crontroller.js";
const Router = express.Router();

Router.post("/", VendaCrontroller.createVenda);
Router.get("/", VendaCrontroller.getVendas);
Router.get("/:id", VendaCrontroller.getVenda);
// Router.put("/", VendaCrontroller.updateVenda);
// Router.delete("/:id", VendaCrontroller.deleteVenda);
Router.all("*", (req, res) => res.send("Page not Found"));

export default Router;
