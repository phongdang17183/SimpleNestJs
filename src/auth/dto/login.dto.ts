import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com', description: 'Email của admin' })
  email: string;

  @ApiProperty({ example: 'admin123', description: 'Mật khẩu của admin' })
  password: string;
}
