import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, IsOptional, IsInt, Min } from 'class-validator';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Decimal128 } from 'typeorm';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({name: 'categoryName',example: ''})
    categoryName: string;
  
    @ApiProperty({name: 'description',example: ''})
    @IsString()
    description?: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty({name: 'products',example: ''})
    products: ProductEntity[];
}
