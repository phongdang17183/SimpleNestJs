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
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const clientEmail = process.env.CLIENT_EMAIL;
    const clientPassword = process.env.CLIENT_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (body.email === adminEmail && body.password === adminPassword) {
      const payload = { sub: 'admin', email: body.email, role: 'admin' };
      const access_token = this.jwtService.sign(payload, {
        secret: jwtSecret,
      });
      return { access_token };
    }

    if (body.email === clientEmail && body.password === clientPassword) {
      const payload = { sub: 'client', email: body.email, role: 'client' };
      const access_token = this.jwtService.sign(payload, {
        secret: jwtSecret,
      });
      return { access_token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
