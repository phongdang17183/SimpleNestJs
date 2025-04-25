import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

describe('DevicesController', () => {
  let controller: DeviceController;
  let deviceService: jest.Mocked<DeviceService>;

  beforeEach(async () => {
    const mockDeviceService = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [
        {
          provide: DeviceService,
          useValue: mockDeviceService,
        },
      ],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
    deviceService = module.get(DeviceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call deviceService.create with correct data', async () => {
    const dto: CreateDeviceDto = {
      userId: 'user123',
      deviceName: 'iPhone 14 Pro Max',
      deviceType: 'iOS',
    };
    const spy = jest.spyOn(deviceService, 'create');
    await controller.create(dto);
    expect(spy).toHaveBeenCalledWith(dto);
  });

  it('should return all users from deviceService.findAll', async () => {
    const devices = [
      {
        _id: 'device123',
        userId: 'user123',
        deviceName: 'Pixel 7',
        deviceType: 'Android',
      },
    ];
    deviceService.findAll.mockResolvedValue(devices);
    const result = await controller.findAll();
    expect(result).toEqual(devices);
  });

  it('should update user correctly', async () => {
    const dto: UpdateDeviceDto = {
      deviceName: 'Updated Device Name',
    };
    const id = 'device123';
    const updatedDevice = {
      _id: id,
      userId: 'user123',
      deviceName: 'Updated Device Name',
      deviceType: 'iOS',
    };

    const spy = jest
      .spyOn(deviceService, 'update')
      .mockResolvedValue(updatedDevice);

    const result = await controller.update(id, dto);
    expect(spy).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(updatedDevice);
  });

  it('should delete user by id', async () => {
    const id = 'device123';
    const deletedDevice = {
      _id: id,
      userId: 'user123',
      deviceName: 'To Delete',
      deviceType: 'Web',
    };

    const spy = jest
      .spyOn(deviceService, 'remove')
      .mockResolvedValue(deletedDevice);

    const result = await controller.remove(id);
    expect(spy).toHaveBeenCalledWith(id);
    expect(result).toEqual(deletedDevice);
  });
});
