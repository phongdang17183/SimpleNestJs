import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guard/authGuard';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo người dùng mới',
    description: 'Tạo một người dùng mới.',
  })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({
    summary: 'Xem tất cả người dùng',
    description: 'Xem tất cả người dùng hiện có trong database.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Cập nhật người dùng',
    description: 'Cập nhật người dùng với ID được chỉ định.',
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa người dùng',
    description: 'Xóa người dùng với ID được chỉ định.',
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
