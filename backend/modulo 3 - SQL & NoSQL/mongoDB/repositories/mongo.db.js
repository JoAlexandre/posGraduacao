import mongodb from "mongodb";
import mongoose from "mongoose";
//pelo driver nativo
function getClient() {
  const uri = `mongodb+srv://joseadoes:YYFqzKS1j3Nqlb4k@cluster0.lcrcicp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  return new mongodb.MongoClient(uri)
}

async function connect() {
  const uri = `mongodb+srv://joseadoes:YYFqzKS1j3Nqlb4k@cluster0.lcrcicp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  return await mongoose.connect(uri)
}

export { getClient, connect };
