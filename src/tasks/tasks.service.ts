import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: String): Task {
        return this.tasks.find( task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task; 
    }

    updateTask(id: String, update: UpdateTaskDto): Task {

        const { title, description, status} = update;
        
        for(let i = 0; i < this.tasks.length; i++){

            if(this.tasks[i].id === id){

                const task = this.tasks[i];

                title ? task.title = title : null;
                description ? task.description = description : null;
                status === 'OPEN' ? task.status = TaskStatus.OPEN : null;
                status === 'DONE' ? task.status = TaskStatus.DONE : null;
                status === 'IN_PROGRESS' ? task.status = TaskStatus.IN_PROGRESS : null;

                this.tasks[i] = task;
                return this.tasks[i];

            }
        }

    }
    
    deleteTask(id: String): String{
        this.tasks = this.tasks.filter( task => task.id !== id);
        return 'Task deleted'
    }

}
