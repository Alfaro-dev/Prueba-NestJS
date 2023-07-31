import { IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../../../entities/task.entity';

export class CreateTaskDto {
    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
}