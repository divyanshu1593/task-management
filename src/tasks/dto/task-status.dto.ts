import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
