import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

app.use(express.static("public"));
app.use("/images", express.static("public"));

app.listen(8080, () => {
	console.log("API Started");
});
