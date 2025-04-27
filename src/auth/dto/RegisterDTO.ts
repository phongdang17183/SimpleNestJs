import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({ example: 'abc', description: 'Name cua user' })
  name: string;

  @ApiProperty({ example: 'abc@gmail.com', description: 'Email cua user' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Password cua user' })
  password: string;
 
  @ApiProperty({ example: 'user', description: 'Role cua user' })
  role: string;
}
