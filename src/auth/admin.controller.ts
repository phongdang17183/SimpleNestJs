import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './Guard/authGuard';
import { RolesGuard } from './Guard/roles.guard';
import { Roles } from './Strategy/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  @Roles('admin')
  @Get('dashboard')
  getDashboard() {
    return { secretData: 'only for admins' };
  }
}