// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Req, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service';
import { LoginDto } from './dto/LoginDto';
import { log } from 'console';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * Register a new user with hashed password
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Optional: check for existing email
    const { email, password, ...rest } = createUserDto;
    const existing = await this.userService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      ...rest,
      email,
      password: hashedPassword,
    });

    return user;
  }

  /**
   * Authenticate user and issue JWT
   */
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() dto: LoginDto) {
    // manual flow
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }
}
