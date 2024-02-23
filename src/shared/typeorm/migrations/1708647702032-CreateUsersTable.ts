import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1708647702032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      await new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'email',
            type: 'string',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'string',
          },
          {
            name: 'avatar',
            type: 'string',
            isNullable: true,
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestemp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('users')
  }
}
