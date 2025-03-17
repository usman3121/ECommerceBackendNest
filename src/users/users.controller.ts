import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/create-signIn.dto';
import { CurrentUser } from 'src/utilities/customDecorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/utilities/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utilities/customDecorators/authrize-role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRoleEnums } from 'src/utilities/enums/role.enum';


@ApiBearerAuth()
@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  

  @Post('signin')
  async signIn(@Body() userDto: SignInDto){

    const user = await this.usersService.SignIn(userDto);
    const accessToken = await this.usersService.accessToken(user);
    return {accessToken,user}

  }

  @Post('signup')
  async signUp(@Body() userDto: UserDto){
    const user = await this.usersService.SignUp(userDto);
    return user;
  }

  @AuthorizeRoles(UserRoleEnums.USER)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@CurrentUser() currentUser : UserEntity) {
    return currentUser;
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

 
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any)  {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
