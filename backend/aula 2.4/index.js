/**
 * Tratamento de erros
 * 
 */

import express from 'express'

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
  throw new Error("Error message test")
})
app.get('/async', async (req, res, next) => {
  try {
    throw new Error("Error message async")
    
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.log('Error 1')
  next(err)
})
app.use((err, req, res, next) => {
  console.log('Error 2')
  res.status(500).send("Ocorreu um erro, tente novamente mais tarde")
})
app.listen(8080, () => {
  console.log("API is listening !")
})
