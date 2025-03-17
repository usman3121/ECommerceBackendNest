import { Body, Injectable, NotFoundException, Query } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import {hash,compare}  from 'bcrypt';
import { SignInDto } from './dto/create-signIn.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userEntity : Repository<UserEntity>
  ){}  


  async SignUp(userDto : UserDto){
    const userExist = await this.findUserByEmail(userDto.email);
    if(userExist){
      return {message : "This email already exists" , body: null}
    }
    userDto.password = await hash(userDto.password,10);
    const user = this.userEntity.create(userDto);
    const result = await this.userEntity.save(user);
    const result1 = await this.findUserByEmail(result.email);
    if(result1){
      return result1;
    }
  }

  async SignIn(userDto : SignInDto){
    const userExist = await this.userEntity.createQueryBuilder('users').addSelect('users.password').where('users.email=:email',{email:userDto.email}).getOne();
    if(!userExist){
      throw new NotFoundException("usee not exist")
    }
    const matchPassword = await compare(userDto.password,userExist.password);
    if(!matchPassword){
      throw new NotFoundException("password not match")
    }
    delete userExist.password;
    return userExist;    

  }
  async accessToken(user :UserEntity){
    return sign({id:user.id,email:user.email,role:user.role},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
  }

  async findUserByEmail(email : string){
    const result = await this.userEntity.findOneBy({email});
    return result;
  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll() {
    const result = await this.userEntity.find();
    if(result){
      return {message : "user list fetch succefull", body : result}
    }else{
      return {message : "error in user list",body: null}
    }
  }

  async findOne(id: number) {
    const user = await this.userEntity.findOneBy({id})
    if(user){
      return user;
    }else{
      throw new  NotFoundException ("user not found");

    }
  }


  async update(id: number, data: any) {
    const findUser = await this.userEntity.findOneBy({id});
    if(!findUser){
      return {message : "user not found", body : null}
    }
    const updateUser = Object.assign(findUser,data);
    const result = await this.userEntity.save(updateUser);
    return {message : "usere updated succesfull",body :result}
  }

  async remove(id: number) {
    const findUser = await this.userEntity.findOneBy({id});
    if(!findUser){
      return {message : "user nor found", body : null}
    }
    const result = await this.userEntity.save(findUser);
    return {message : "usere deleted succesfull",body :result}
  }
}
