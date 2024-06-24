import express from "express";
import ClientCrontroller from "../controllers/client.crontroller.js";
const Router = express.Router();

Router.post("/", ClientCrontroller.createClient);
Router.put("/", ClientCrontroller.updateClient);
Router.get("/", ClientCrontroller.getClients);
Router.get("/:id", ClientCrontroller.getClient);
Router.delete("/:id", ClientCrontroller.deleteClient);
Router.all("*", (req, res) => res.send("Page not Found"));

export default Router;
