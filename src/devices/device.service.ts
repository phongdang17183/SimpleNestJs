import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async create(dto: CreateDeviceDto): Promise<Device> {
    const createdDevice = new this.deviceModel(dto);
    return createdDevice.save();
  }

  async findAll(): Promise<Device[]> {
    return this.deviceModel.find().exec();
  }

  async update(id: string, updates: Partial<Device>): Promise<Device> {
    const updatedDevice = await this.deviceModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();

    if (!updatedDevice) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }

    return updatedDevice;
  }

  async remove(id: string): Promise<Device | null> {
    const deleteDevice = await this.deviceModel.findByIdAndDelete(id).exec();
    if (!deleteDevice) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }
    return deleteDevice;
  }
}
