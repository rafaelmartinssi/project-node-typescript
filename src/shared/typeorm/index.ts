import { DataSource } from 'typeorm'
import { CreateRolesTable1708384497492 } from './migrations/1708384497492-CreateRolesTable'
import { CreateUsersTable1708647702032 } from './migrations/1708647702032-CreateUsersTable'
import { Role } from '@roles/entities/Role'

const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [CreateRolesTable1708384497492, CreateUsersTable1708647702032],
})

export { dataSource }
