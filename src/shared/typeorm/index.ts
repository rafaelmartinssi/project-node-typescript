import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  //type: 'sqlite'
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  //database: './db.sqlite',
  database: 'node',
  entities: [],
  migrations: [],
})

export { dataSource }
