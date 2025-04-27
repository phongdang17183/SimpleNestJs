// src/auth/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector }     from '@nestjs/core';
import { ROLES_KEY } from '../Strategy/roles.decorator';
import { log } from 'console';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string>(
      ROLES_KEY,
      ctx.getHandler(),
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;  // no @Roles() on this route
    }

    const { user } = ctx.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('Not logged in');
    }

    // user.role may be string or string[]
    const userRoles = user.role;
    log('hasRole', requiredRoles);
    log('userRoles', userRoles);
    for (const role of requiredRoles) {
      if(role === userRoles) {
        return true;  // user has required role
      }
    }
  
    throw new ForbiddenException('Insufficient role');
    
  }
}
