import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('Devices')
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  create(@Body() body: CreateDeviceDto) {
    return this.deviceService.create(body);
  }

  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Device ID' })
  update(@Param('id') id: string, @Body() body: UpdateDeviceDto) {
    return this.deviceService.update(id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Device ID' })
  remove(@Param('id') id: string) {
    return this.deviceService.remove(id);
  }
}
