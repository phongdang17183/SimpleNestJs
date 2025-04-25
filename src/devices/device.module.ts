import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceService } from './device.service';
import { Device, DeviceSchema } from './schemas/device.schema';
import { DeviceController } from './device.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  providers: [DeviceService, DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
