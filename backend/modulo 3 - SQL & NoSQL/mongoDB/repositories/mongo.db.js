import mongodb from "mongodb";
import mongoose from "mongoose";
//pelo driver nativo
function getClient() {
  const uri = process.env.url_db_mongo
  return new mongodb.MongoClient(uri)
}

async function connect() {
  const uri = process.env.url_db_mongo
  return await mongoose.connect(uri)
}

export { getClient, connect };
