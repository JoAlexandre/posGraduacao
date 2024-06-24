import mongoose from 'mongoose'

async function connect(){
  return await mongoose.connect(process.env.mongo_db)
}

export default { connect }