// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'abc@gmail.com', description: 'Email cua user' })
  email: string;

  @IsString()
  @ApiProperty({ example: '123456', description: 'Password cua user' })
  @MinLength(6)
  password: string;
}
