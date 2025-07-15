"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_1 = require("./entities/task/task");
let TaskService = class TaskService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto, userId) {
        const task = this.repo.create({ ...dto, user: { id: userId } });
        return this.repo.save(task);
    }
    findAll(userId) {
        return this.repo.find({
            where: { user: { id: userId } },
            order: { index_position: 'ASC' },
        });
    }
    findOne(id) {
        return this.repo.findOneBy({ id });
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.repo.findOneBy({ id });
    }
    remove(id) {
        return this.repo.delete(id);
    }
    async reorderTasks(tasks) {
        if (tasks.length > 0) {
            const taskToUpdate = tasks[0];
            await this.repo.update(taskToUpdate.id, {
                index_position: taskToUpdate.index_position,
            });
        }
        return { success: true };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map