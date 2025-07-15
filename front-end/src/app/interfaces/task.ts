export interface Task {
  id: string;
  title: string;
  description?: string;
  status: boolean; // true = done, false = to-do
  createdAt?: string;
  updatedAt?: string;
  userId: string;
  index_position: number;
}

export interface TaskResponse {
  tasks: Task[];
}
