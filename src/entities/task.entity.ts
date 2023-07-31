
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
        default: TaskStatus.TODO,
    })
    status: TaskStatus;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}