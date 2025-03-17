import { Order } from "src/order/entities/order.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('orderItem')
export class OrderItem {

@PrimaryGeneratedColumn()
id: number;

@ManyToOne(()=> Order, (order)=>order.orderItems)
orderItem : Order;

@ManyToOne(()=> ProductEntity,(product)=>product.id)
product:ProductEntity;

@Column()
quantity: number;

@Column('decimal')
price: number;
}
