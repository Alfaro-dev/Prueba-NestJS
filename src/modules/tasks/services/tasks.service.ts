import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { User } from '../../../entities/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async findAll(user: User): Promise<Task[]> {
        return this.taskRepository.find({ where: { user: user } });
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async create(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new Task();
        task.description = createTaskDto.description;
        task.status = createTaskDto.status;
        task.user = user;
        return this.taskRepository.save(task);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.findOne(id);
        task.description = updateTaskDto.description;
        task.status = updateTaskDto.status;
        task.user = updateTaskDto.user;
        return this.taskRepository.save(task);
    }

    async remove(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}
