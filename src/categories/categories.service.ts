import { Body, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor (
    @InjectRepository(CategoryEntity)
    private categoryRepository : Repository<CategoryEntity>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const data = this.categoryRepository.create(createCategoryDto);
    const result  = await this.categoryRepository.save(data);
    return {message : `category created succesful` , body : result };
  }

  async findAll() {
    const result = await this.categoryRepository.find();
    return {message : `categories list fetch succesful` , body : result}
  }

  async findOne(id: number) {
    const result = await this.categoryRepository.findOneBy({id});
    if(result){
      return { message : `category with this ${id} fetch succesfull.`, body :  result};
    }else{
      return { message : `category with this ${id} not found`, body :  null};
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const findData =  await this.categoryRepository.findOneBy({id});
    if(!findData){
      return { message : `category with this ${id} not found`, body :  null};
    }
    const updatedData = Object.assign(findData,updateCategoryDto);
    const result = this.categoryRepository.save(updatedData);

    return { message : `category with this ${id} update succesfull.`, body :  result};
  }

  async remove(id: number) {
    const findData =  await this.categoryRepository.findOneBy({id});
    if(!findData){
      return { message : `category with this ${id} not found`, body :  null};
    }
    const deleteData = await this.categoryRepository.delete(findData);
    return { message : `category with this ${id} update succesfull.`, body :  deleteData};
  }
}
