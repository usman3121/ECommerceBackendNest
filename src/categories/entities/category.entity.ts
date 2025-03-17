import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryName: String;

    @Column()
    description: String;

    @OneToMany(() => ProductEntity, (product) => product.category, { eager: true })
    products: ProductEntity[];


}
