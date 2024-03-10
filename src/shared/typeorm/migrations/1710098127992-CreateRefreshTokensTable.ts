import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRefreshTokensTable1710098127992
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'string',
          },
          {
            name: 'token',
            type: 'string',
            isUnique: true,
          },
          {
            name: 'valid',
            type: 'boolean',
            default: true,
          },
          {
            name: 'expires',
            type: 'timestemp',
          },
          {
            name: 'created_at',
            type: 'timestemp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'refreshTokensUsers',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('refresh_tokens')
  }
}
