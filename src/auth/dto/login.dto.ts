import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email của người đăng',
  })
  email: string;

  @ApiProperty({
    example: 'admin123',
    description: 'Mật khẩu của người đăng nhâp',
  })
  password: string;
}
