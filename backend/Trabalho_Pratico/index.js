import express from 'express'
import marcas from './routes/marcas.js'
const app = express()

app.use(express.json())
app.use('/marcas', marcas)

app.listen(8082, () => {
  console.log("API has started")
})