import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatusDto } from './dto/task-status.dto';
import { UpdateResult } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(getTasksFilterDto, user);
  }

  async getTaskById(getTaskByIdDto: GetTaskByIdDto, user: User): Promise<Task> {
    const { id } = getTaskByIdDto;
    const task = await this.taskRepository.findOneBy({ id, user });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTasks(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(
    getTaskByIdDto: GetTaskByIdDto,
    @GetUser()
    user: User,
  ): Promise<void> {
    const { id } = getTaskByIdDto;
    const result = await this.taskRepository.delete({ id, user });

    if (!result.affected) throw new NotFoundException();
  }

  async updateTaskStatus(
    getTaskByIdDto: GetTaskByIdDto,
    taskStatusDto: TaskStatusDto,
    user: User,
  ): Promise<UpdateResult> {
    const { status } = taskStatusDto;
    const { id } = getTaskByIdDto;

    const result = await this.taskRepository.update(
      { id, user },
      { status: status },
    );
    if (!result.affected) throw new NotFoundException();
    return result;
  }
}
