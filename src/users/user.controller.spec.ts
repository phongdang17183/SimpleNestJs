import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const mockUserService = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call userService.create with correct data', async () => {
    const dto: CreateUserDto = { name: 'Test', email: 'test@example.com' };
    const spy = jest.spyOn(userService, 'create');
    await controller.create(dto);
    expect(spy).toHaveBeenCalledWith(dto.name, dto.email);
  });

  it('should return all users from userService.findAll', async () => {
    const users = [{ name: 'User1', email: 'user1@example.com' }];
    userService.findAll.mockResolvedValue(users);
    const result = await controller.findAll();
    expect(result).toEqual(users);
  });

  it('should update user correctly', async () => {
    const dto: UpdateUserDto = { name: 'Updated Name' };
    const id = '123';
    const updatedUser = {
      _id: id,
      name: 'Updated Name',
      email: 'old@mail.com',
    };

    const spy = jest
      .spyOn(userService, 'update')
      .mockResolvedValue(updatedUser);

    const result = await controller.update(id, dto);
    expect(spy).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(updatedUser);
  });

  it('should delete user by id', async () => {
    const id = '123';
    const deletedUser = {
      _id: id,
      name: 'To Delete',
      email: 'delete@mail.com',
    };

    const spy = jest
      .spyOn(userService, 'remove')
      .mockResolvedValue(deletedUser);

    const result = await controller.remove(id);
    expect(spy).toHaveBeenCalledWith(id);
    expect(result).toEqual(deletedUser);
  });
});
