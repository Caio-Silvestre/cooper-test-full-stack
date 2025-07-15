import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddColumnIndexPositionOnTasks1752351247352 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
