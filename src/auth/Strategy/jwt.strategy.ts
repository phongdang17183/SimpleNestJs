// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy as JwtPassStrategy , StrategyOptions } from 'passport-jwt';
import { UserService } from 'src/users/user.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  JwtPassStrategy,
  'jwt',                 // ← make sure the name is “jwt”
) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) throw new Error('Missing JWT_SECRET');

    const opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:    secret,
      ignoreExpiration: false,
    };
    super(opts);
  }

  async validate(payload: any): Promise<User> {
    const userDoc = await this.userService.findByEmail(payload.email);
    
    // you can now safely do:
    if (!userDoc) {
      throw new UnauthorizedException("Invalid token payload");
    }
  
    // and:
    const { password, ...result } = userDoc;
    return userDoc;
  }
}
