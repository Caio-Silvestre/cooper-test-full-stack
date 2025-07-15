import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task/task';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto/update-task.dto';
import { Request } from 'express';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async create(dto: CreateTaskDto, userId: number) {
    const task = this.repo.create({ ...dto, user: { id: userId } });
    return this.repo.save(task);
  }

  findAll(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      order: { index_position: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.repo.update(id, dto);
    return this.repo.findOneBy({ id });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async reorderTasks(tasks: { id: string; index_position: number }[]) {
    // Atualiza apenas a primeira tarefa da lista (a que foi movida)
    if (tasks.length > 0) {
      const taskToUpdate = tasks[0];
      await this.repo.update(taskToUpdate.id, {
        index_position: taskToUpdate.index_position,
      });
    }
    return { success: true };
  }
}
