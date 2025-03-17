
import { SetMetadata } from '@nestjs/common';
import { UserRoleEnums } from '../enums/role.enum';

export const ROLES_KEY = 'allowedRoles'
export const AuthorizeRoles = (...roles: UserRoleEnums[]) => SetMetadata(ROLES_KEY, roles);
