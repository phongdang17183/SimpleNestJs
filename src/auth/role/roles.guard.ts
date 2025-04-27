import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface RequestWithUser extends Request {
  user: {
    role: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    console.log('Account role:', user.role);

    if (!user || !user.role) {
      return false;
    }

    return roles.includes(user.role);
  }
}
