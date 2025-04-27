// src/auth/auth.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UserService } from 'src/users/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user credentials and return sanitized user object
   */
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
        // throw wrong credentials error
      throw new BadRequestException('Email not found. Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException('Password does not match. Invalid credentials');
    }

    // Exclude password from returned user
    return user;
  }

  /**
   * Sign JWT for authenticated user
   */
  async login(user: User) {
    const userDoc = await this.userService.findByEmail(user.email);
    if (!userDoc) {
      throw new BadRequestException('Invalid user');
    }
    const payload = { email: userDoc.email, role: userDoc.role };
    log('JWT payload service:', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
