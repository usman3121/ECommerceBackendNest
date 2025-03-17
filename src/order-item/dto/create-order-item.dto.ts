import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, IsOptional, IsInt, Min } from 'class-validator';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Decimal128 } from 'typeorm';

export class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({name: 'product',example: ''})
    product: ProductEntity;
  
    @IsInt()
    @ApiProperty({name: 'quantity',example: ''})
    quantity: number;
  
    @IsDecimal()
    @ApiProperty({name: 'price',example: ''})
    price: number;
}
