import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../services/tasks.service';
import { TasksController } from './tasks.controller';
import { User } from '../../../entities/user.entity';
import { Task, TaskStatus } from '../../../entities/task.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
    tasksController = moduleRef.get<TasksController>(TasksController);
  });

  it('should return an array of tasks for the authenticated user', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'John Doe';
    user.email = 'john@example.com';

    const tasks: Task[] = [
      { id: 1, description: 'Task 1', status: TaskStatus.IN_PROGRESS, user },
      { id: 2, description: 'Task 2', status: TaskStatus.TODO, user },
    ];

    jest.spyOn(tasksService, 'findAll').mockResolvedValue(tasks);

    const result = await tasksController.findAll({ user });

    expect(result).toEqual(tasks);
  });
});
