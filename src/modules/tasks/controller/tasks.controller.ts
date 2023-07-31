import { Controller, Get, Post, Body, UseGuards, Param, ParseIntPipe, Delete, Put, Request } from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guard';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TasksService } from '../services/tasks.service';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../../../entities/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Request() req): Promise<Task[]> {
        return this.tasksService.findAll(req.user);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(req.user, createTaskDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        return this.tasksService.update(id, updateTaskDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.remove(id);
    }
}
