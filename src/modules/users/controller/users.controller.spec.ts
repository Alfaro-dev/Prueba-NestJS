import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../services/users.service';
import { Task } from 'src/entities/task.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    var tasks: Task[];

    it('should return an array of users', async () => {
      const result: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password', tasks: tasks, },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password', tasks: tasks, },
      ];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(result);

      const response = await usersController.findAll();
      expect(response).toEqual(result);
    });
  });
});
