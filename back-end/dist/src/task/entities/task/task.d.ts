import { User } from '../../../user/entities/user/user';
export declare class Task {
    id: number;
    title: string;
    status: boolean;
    index_position: number;
    user: User;
}
