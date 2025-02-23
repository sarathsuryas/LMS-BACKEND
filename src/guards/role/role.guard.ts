import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; 
    }
    const { decodedData } = context.switchToHttp().getRequest();
    console.log(decodedData)
    const hasRole = requiredRoles.some(role => decodedData.role?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission (roles)');
    }
    return true; 

  }
}
