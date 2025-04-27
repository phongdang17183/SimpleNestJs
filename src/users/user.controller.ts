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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role/roles.guard';
import { Roles } from '../auth/role/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({
    summary: 'Tạo người dùng mới',
    description: 'Tạo một người dùng mới.',
  })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  @Roles('admin', 'client')
  @ApiOperation({
    summary: 'Xem tất cả người dùng',
    description: 'Xem tất cả người dùng hiện có trong database.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({
    summary: 'Cập nhật người dùng',
    description: 'Cập nhật người dùng với ID được chỉ định.',
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({
    summary: 'Xóa người dùng',
    description: 'Xóa người dùng với ID được chỉ định.',
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
