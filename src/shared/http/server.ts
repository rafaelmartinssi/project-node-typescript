import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, () => {
  console.log(`Server starded on port ${process.env.PORT}`)
})

app.get('/', (request, response) => {
  return response.json({ message: 'Olá mundo' })
})
