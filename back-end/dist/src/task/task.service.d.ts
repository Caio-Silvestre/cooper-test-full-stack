import { Repository } from 'typeorm';
import { Task } from './entities/task/task';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto/update-task.dto';
export declare class TaskService {
    private repo;
    constructor(repo: Repository<Task>);
    create(dto: CreateTaskDto, userId: number): Promise<Task>;
    findAll(userId: number): Promise<Task[]>;
    findOne(id: number): Promise<Task | null>;
    update(id: number, dto: UpdateTaskDto): Promise<Task | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    reorderTasks(tasks: {
        id: string;
        index_position: number;
    }[]): Promise<{
        success: boolean;
    }>;
}
