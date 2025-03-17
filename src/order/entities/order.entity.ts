import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'decimal', default: 0 })
  totalAmount: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem, { cascade: true })
  orderItems: OrderItem[];
}