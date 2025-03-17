import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRoleEnums } from "../enums/role.enum";
import { ROLES_KEY } from "../customDecorators/authrize-role.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";



@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnums[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request.currentUser; 
    if (!user || !requiredRoles.includes(user.role)) {
      throw new UnauthorizedException('You do not have the required role to access this resource');
    }

    return true;
  }
}
