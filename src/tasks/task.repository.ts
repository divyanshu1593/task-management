import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }

  async getTasks(
    getTasksFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = getTasksFilterDto;
    const where: FindOptionsWhere<Task> = {};

    let tasks: Task[];
    where.user = user;

    if (status) where.status = status;

    if (search) {
      const where1: FindOptionsWhere<Task> = structuredClone(where);
      const where2: FindOptionsWhere<Task> = structuredClone(where);

      where1.title = Like(`%${search}%`);
      where2.description = Like(`%${search}%`);

      tasks = await this.findBy([where1, where2]);
    } else {
      tasks = await this.findBy(where);
    }

    return tasks;
  }
}
