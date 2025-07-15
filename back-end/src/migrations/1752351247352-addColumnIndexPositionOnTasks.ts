import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnIndexPositionOnTasks1752351247352
  implements MigrationInterface
{
  name = 'AddColumnIndexPositionOnTasks1752351247352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "index_position" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "index_position"`);
  }
}
