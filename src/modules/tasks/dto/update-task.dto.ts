import { IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { TaskStatus } from '../../../entities/task.entity';
import { User } from '../../../entities/user.entity';

export class UpdateTaskDto {
    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsNotEmpty()
    user: User;
}