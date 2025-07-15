"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const task_module_1 = require("./task/task.module");
const typeorm_1 = require("@nestjs/typeorm");
const task_1 = require("./task/entities/task/task");
const user_1 = require("./user/entities/user/user");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const contact_module_1 = require("./contact/contact.module");
const contact_message_entity_1 = require("./contact/contact-message.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            task_module_1.TaskModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.TYPEORM_CONNECTION,
                host: process.env.TYPEORM_HOST || 'localhost',
                port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
                username: process.env.TYPEORM_USERNAME || 'postgres',
                password: process.env.TYPEORM_PASSWORD || '',
                database: process.env.TYPEORM_DATABASE || '',
                entities: [task_1.Task, user_1.User, contact_message_entity_1.ContactMessage],
                synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
            }),
            contact_module_1.ContactModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map