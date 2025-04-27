import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'abc', description: 'Name cua user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'abc@gmail.com', description: 'Email cua user' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
