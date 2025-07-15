"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnIndexPositionOnTasks1752351247352 = void 0;
class AddColumnIndexPositionOnTasks1752351247352 {
    name = 'AddColumnIndexPositionOnTasks1752351247352';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "index_position" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "index_position"`);
    }
}
exports.AddColumnIndexPositionOnTasks1752351247352 = AddColumnIndexPositionOnTasks1752351247352;
//# sourceMappingURL=1752351247352-addColumnIndexPositionOnTasks.js.map