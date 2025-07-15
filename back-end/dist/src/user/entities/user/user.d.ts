import { Task } from '../../../task/entities/task/task';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
}
