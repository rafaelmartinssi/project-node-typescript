import { DataSource } from 'typeorm'
import { CreateRolesTable1708384497492 } from './migrations/1708384497492-CreateRolesTable'

const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [],
  migrations: [CreateRolesTable1708384497492],
})

export { dataSource }
