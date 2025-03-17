import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports : [TypeOrmModule.forFeature([OrderItem,ProductEntity])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
