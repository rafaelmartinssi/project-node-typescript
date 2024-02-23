import { DataSource } from 'typeorm'
import { Role } from '@roles/entities/Role'
import { CreateRolesTable1708384497492 } from './migrations/1708384497492-CreateRolesTable'
import { CreateUsersTable1708647702032 } from './migrations/1708647702032-CreateUsersTable'
import { AddRoleIdToUsersTable1708648601182 } from './migrations/1708648601182-AddRoleIdToUsersTable'

const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [
    CreateRolesTable1708384497492,
    CreateUsersTable1708647702032,
    AddRoleIdToUsersTable1708648601182,
  ],
})

export { dataSource }
