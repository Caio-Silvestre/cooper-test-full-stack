import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateUserAndTaskTables1752191685342 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
