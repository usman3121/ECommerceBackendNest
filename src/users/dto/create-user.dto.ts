import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRoleEnums } from "src/utilities/enums/role.enum";

export class UserDto {

    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    @ApiProperty({ name: 'email', example: 'usman@yahoo.com' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @ApiProperty({ name: 'password', example: '' })
    password: string;


    @IsEnum(UserRoleEnums, { message: 'Invalid role specified' })
    @IsNotEmpty({ message: 'Role is required' })
    @ApiProperty({ name: 'role', example: UserRoleEnums.ADMIN })
    role: UserRoleEnums;


}
