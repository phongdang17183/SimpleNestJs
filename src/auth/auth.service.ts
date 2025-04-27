import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  login(body: LoginDto) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    if (body.email !== adminEmail || body.password !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 'admin', email: body.email };
    const token = this.jwtService.sign(payload, {
      secret: jwtSecret,
    });

    return {
      access_token: token,
    };
  }
}
