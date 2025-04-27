import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MockJwtAuthGuard } from './mock-jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({ access_token: 'mockToken' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: JwtAuthGuard,
          useClass: MockJwtAuthGuard, // Sử dụng MockJwtAuthGuard
        },
        {
          provide: AuthService,
          useValue: mockAuthService, // Mock AuthService
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call login from AuthService', async () => {
    const mockLoginDto: LoginDto = {
      email: 'test',
      password: 'test',
    };
    const result = await controller.login(mockLoginDto);
    expect(result).toEqual({ access_token: 'mockToken' });
    expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginDto);
  });
});
