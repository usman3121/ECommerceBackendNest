import { Body, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductEntity)
    private productRepository : Repository<ProductEntity>
  
  ){}

  async create(createProductDto: CreateProductDto):Promise<{ message: string; body: ProductEntity }>  {
    console.log('agixaiuasunasod');
    const data = this.productRepository.create(createProductDto);

    const result  = await this.productRepository.save(data)
    return {message : `product created succesful` , body : result};
  }

 async findAll() {
    const result = await this.productRepository.find();
    return {message : `product list fetch succesful` , body : result}
  }

  async findOne(id: number) {
    const result = await this.productRepository.findOneBy({id});
    if(!result){
    return {message : `product with ${id} not found` , body : null}
    }else{
    return {message : `product with ${id} fetch succesful` , body : result}
    }
  }

 async update(id: number, updateProductDto: UpdateProductDto) {
    const data = await this.productRepository.findOneBy({id});
    if(!data){
      return {message : `product with ${id} not found`,body : null};
    }
    const result = Object.assign(data , updateProductDto);
    const updatedProduct = await this.productRepository.save(result);
    return {message : `product with ${id} updated succesful` , body : updatedProduct};
  }

 async remove(id: number) {
    const data = await this.productRepository.findOneBy({id});
    if(!data){
      return {message : `product with ${id} not found`,body : null};
    }
     await this.productRepository.delete(data);
     return {message : `product deleted succesful` , body : data}
  };
}
