import e from "express";
import orders from './routes/orders.routes.js'

const app = e()

app.use(e.json())
app.use('/orders', orders)

app.listen(8080, () => {
  console.log('API is running')
})