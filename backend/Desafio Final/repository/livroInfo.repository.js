import LivroInfoSchema from '../schemas/livroInfo.schema.js'
import {connect} from './mongo.db.js'
async function getLivroInfo(livroId) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema)
    return await LivroInfo.findOne({livroId}).exec() 
  } catch (error) {
    throw error
  }
  
}