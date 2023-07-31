import { Test, TestingModule, } from "@nestjs/testing";
import { AuthService } from "../services/auth.service";
import { AuthController } from "./auth.controller";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../../entities/user.entity";


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Use a mock class here if needed
        },
      ],
    }).compile();


    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a new user', async () => {
    const registerDto: RegisterDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    };

    jest.spyOn(authService, 'register').mockImplementation(async () => {
      const newUser = {
        id: 1,
        name: registerDto.name,
        email: registerDto.email,
        tasks: [],
      };
      return newUser;
    });

    const result = await controller.register(registerDto);

    expect(result).toEqual(registerDto);
  });

  it('should log in a user', async () => {
    const loginDto: LoginDto = {
      email: 'john@example.com',
      password: '123456',
    };

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE2MjgyODU2MTMsImV4cCI6MTYyODI4OTIxM30.Jx-FIMXWyPNIDN_n-NxdKcnkbM9QWgyG7YvBfbP_Z94';

    jest.spyOn(authService, 'login').mockResolvedValue({ access_token: accessToken });

    const result = await controller.login(loginDto);

    expect(result).toEqual({ access_token: accessToken });
  });
});