import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';
import { Task } from './task.entity';
import { TaskStatusDto } from './dto/task-status.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { TestGuard } from './test.guard';
import { Roles } from 'src/roles.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(TestGuard)
  @Roles(['some role'])
  @Get('test/guard')
  testGuard(@Req() req: any, @Res() res: any) {
    if (Array.isArray(res.executionFlow)) {
      res.executionFlow.push('in tasks controller');
    } else {
      res.executionFlow = ['in tasks controller'];
    }
    if (Array.isArray(req.executionFlow)) {
      req.executionFlow.push('in tasks controller');
    } else {
      req.executionFlow = ['in tasks controller'];
    }

    console.log('req', req.executionFlow);
    console.log('res', res.executionFlow);

    res.send('testing');
  }

  @Get('test')
  test(@Req() req: any, @Res() res: any) {
    if (Array.isArray(res.executionFlow)) {
      res.executionFlow.push('in tasks controller');
    } else {
      res.executionFlow = ['in tasks controller'];
    }
    if (Array.isArray(req.executionFlow)) {
      req.executionFlow.push('in tasks controller');
    } else {
      req.executionFlow = ['in tasks controller'];
    }

    console.log('req', req.executionFlow);
    console.log('res', res.executionFlow);

    res.send('testing');
  }

  @Get('test/exception')
  testForException(@Req() req: any, @Res() res: any) {
    console.log('here');
    if (Array.isArray(res.executionFlow)) {
      res.executionFlow.push('in tasks controller');
    } else {
      res.executionFlow = ['in tasks controller'];
    }
    if (Array.isArray(req.executionFlow)) {
      req.executionFlow.push('in tasks controller');
    } else {
      req.executionFlow = ['in tasks controller'];
    }

    console.log('req', req.executionFlow);
    console.log('res', res.executionFlow);

    throw new HttpException('testing', HttpStatus.BAD_REQUEST);
  }

  @Get()
  getTasks(
    @Query()
    getTasksFilterDto: GetTasksFilterDto,
    @GetUser()
    user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(getTasksFilterDto, user);
  }

  @Get(':id')
  getTaskById(
    @Param()
    getTaskById: GetTaskByIdDto,
    @GetUser()
    user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(getTaskById, user);
  }

  @Delete(':id')
  deleteTaskById(
    @Param()
    getTaskByIdDto: GetTaskByIdDto,
    @GetUser()
    user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(getTaskByIdDto, user);
  }

  @Post()
  createTasks(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTasks(createTaskDto, user);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param() getTaskByIdDto: GetTaskByIdDto,
    @Body() taskStatusDto: TaskStatusDto,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.tasksService.updateTaskStatus(
      getTaskByIdDto,
      taskStatusDto,
      user,
    );
  }
}
