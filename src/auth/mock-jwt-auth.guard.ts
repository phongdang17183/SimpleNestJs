import { Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';

@Injectable()
export class MockJwtAuthGuard implements CanActivate {
  canActivate(): boolean {
    return true; // Trả về true để bỏ qua xác thực
  }
}
