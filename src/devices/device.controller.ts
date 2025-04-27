import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Devices')
@ApiBearerAuth()
@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo thiết bị mới',
    description: 'Tạo một thiết bị mới gắn với userId.',
  })
  create(@Body() body: CreateDeviceDto) {
    return this.deviceService.create(body);
  }

  @Get()
  @ApiOperation({
    summary: 'Xem tất cả thiết bị',
    description: 'Xem tất cả thiết bị hiện có trong databasedatabase.',
  })
  findAll() {
    return this.deviceService.findAll();
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Cập nhật thiết bị',
    description: 'Cập nhật thiết bị với ID được chỉ định.',
  })
  @ApiParam({ name: 'id', description: 'Device ID' })
  update(@Param('id') id: string, @Body() body: UpdateDeviceDto) {
    return this.deviceService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa thiết bị',
    description: 'Xóa thiết bị với ID được chỉ định.',
  })
  @ApiParam({ name: 'id', description: 'Device ID' })
  remove(@Param('id') id: string) {
    return this.deviceService.remove(id);
  }
}
