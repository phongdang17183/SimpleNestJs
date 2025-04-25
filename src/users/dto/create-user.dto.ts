import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'abc', description: 'Name cua user' })
  name: string;

  @ApiProperty({ example: 'abc@gmail.com', description: 'Email cua user' })
  email: string;
}
