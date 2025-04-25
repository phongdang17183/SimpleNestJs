import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { getModelToken } from '@nestjs/mongoose';
import { Device } from './schemas/device.schema';

describe('DevicesService', () => {
  let service: DeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: getModelToken(Device.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            findByIdAndUpdate: jest.fn().mockReturnThis(),
            findByIdAndDelete: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
