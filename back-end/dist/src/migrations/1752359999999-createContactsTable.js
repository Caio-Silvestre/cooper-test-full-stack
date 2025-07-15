"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactsTable1752359999999 = void 0;
const typeorm_1 = require("typeorm");
class CreateContactsTable1752359999999 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'contact_message',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'telephone',
                    type: 'varchar',
                },
                {
                    name: 'message',
                    type: 'text',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('contact_message');
    }
}
exports.CreateContactsTable1752359999999 = CreateContactsTable1752359999999;
//# sourceMappingURL=1752359999999-createContactsTable.js.map