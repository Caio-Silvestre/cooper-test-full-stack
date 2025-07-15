import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto/update-task.dto';
import { Request } from 'express';
export interface AuthRequest extends Request {
    user: {
        userId: number;
    };
}
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, req: AuthRequest): Promise<import("./entities/task/task").Task>;
    findAll(req: AuthRequest): Promise<import("./entities/task/task").Task[]>;
    findOne(id: string): Promise<import("./entities/task/task").Task | null>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("./entities/task/task").Task | null>;
    updatePut(id: string, updateTaskDto: UpdateTaskDto): Promise<import("./entities/task/task").Task | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    reorderTasks(reorderDto: {
        tasks: {
            id: string;
            index_position: number;
        }[];
    }): Promise<{
        success: boolean;
    }>;
}
