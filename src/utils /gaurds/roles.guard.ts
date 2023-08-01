import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '@prisma/client';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const req = ctx.getRequest();
    const { user } = req;
    if (user.type == Role.ADMIN) {
      return true;
    }
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((role) => user.type == role);
  }
}
