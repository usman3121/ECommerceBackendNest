import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({name: 'name',example: ''})
    @Column()
    name: String;

    @ApiProperty({name: 'description',example: ''})
    @Column()
    description: String;

    @ApiProperty({name: 'price',example: ''})
    @Column()
    price: number;

    @ApiProperty({name: 'stock',example: ''})
    @Column()
    stock: number;

    @ApiProperty({name: 'category',example: ''})
    @ManyToOne(() => CategoryEntity, (category) => category.products, { eager: false })
    category: CategoryEntity;
}
