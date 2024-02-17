import express from 'express'
import 'express-async-errors'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(9000, () => {
  console.log('Server starded on port 9000')
})

app.get('/', (request, response) => {
  return response.json({ message: 'Olá mundo' })
})
