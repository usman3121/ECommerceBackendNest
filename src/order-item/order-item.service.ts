import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsController } from 'src/products/products.controller';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class OrderItemService {
    constructor (
      @InjectRepository(OrderItem)
      private orderItemRepository : Repository<OrderItem>,
      @InjectRepository(ProductEntity)
      private productRepository : Repository<ProductEntity>
    ){}
    
    async create(createOrderItemDto: CreateOrderItemDto) {
      try {
        const data = this.orderItemRepository.create(createOrderItemDto);   
        const productId =  +data.product;
        const productAvailable = await this.productRepository.findOne({ where: { id: productId },});
        if(productAvailable){
          const productPrice = productAvailable.price;
          const totalPrice = productPrice * data.quantity; 
          const remainingQuantity = productAvailable.stock - data.quantity;
          if(productAvailable.stock < 1){
            productAvailable.stock = 0;
          }else{
          productAvailable.stock = remainingQuantity;
          }
          this.productRepository.save(productAvailable);

          const newData ={
            "quantity" : data.quantity,
            "price" : totalPrice,
            "product" : productAvailable
          }
          
          const result = await this.orderItemRepository.save(newData);
          return { message: 'Order item created successfully', body: result };
        }
      } catch (error) {
          throw new Error(`Failed to create order item: ${error.message}`);
      }
  }
  

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
