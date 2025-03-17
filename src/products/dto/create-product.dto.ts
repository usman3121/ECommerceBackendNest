import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, IsOptional, IsInt, Min } from 'class-validator';
import { CategoryEntity } from 'src/categories/entities/category.entity';



export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({name: 'name',example: ''})
  name: string;

  @IsString()
  @ApiProperty({name: 'description',example: ''})
  description?: string;

  @IsInt()
  @Min(0)
  @ApiProperty({name: 'price',example: ''})
  price: number;

  @IsInt()
  @Min(0)
  @ApiProperty({name: 'stock',example: ''})
  stock: number;

  @IsString()
  @IsOptional()
  @ApiProperty({name: 'category',example: ''})
  category?: CategoryEntity;
}

