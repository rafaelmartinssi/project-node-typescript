import 'dotenv/config'
import 'reflect-metadata'
import { app } from './app'
import { dataSource } from '@shared/typeorm'

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err)
  })

app.listen(process.env.PORT, () => {
  console.log(`Server starded on port ${process.env.PORT}`)
})
