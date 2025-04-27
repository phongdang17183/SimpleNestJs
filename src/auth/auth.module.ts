import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Optional: nếu bạn chỉ cần lấy env var, có thể bỏ ConfigModule hoàn toàn
    ConfigModule.forRoot({ isGlobal: true }),

    JwtModule.registerAsync({
      // Bỏ inject ConfigService nếu không dùng nữa
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN ,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
