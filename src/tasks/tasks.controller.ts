import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: String): Task{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask( @Body() createTaskDto: CreateTaskDto ): Task {
        return this.tasksService.createTask(createTaskDto)
    }

    @Patch('/:id')
    updateTask(
        @Param('id') id: String,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Task {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: String): String {
        return this.tasksService.deleteTask(id);
    }

}
