import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1593302245563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'provider',
              type: 'varchar',
              isNullable: false
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
              isNullable: false,
            },
            {
              name: 'create_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropTable('appointments');
    }

}
