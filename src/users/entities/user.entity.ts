import { IsEmail, IsString, MinLength } from "class-validator";
import { OrderItem } from "src/order-item/entities/order-item.entity";
import { Order } from "src/order/entities/order.entity";
import { UserRoleEnums } from "src/utilities/enums/role.enum";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn()
    id : number;
    
    @Column({unique: true})
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @Column({select : false})
    @IsString({ message: 'Password must be a string' }) 
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password : string

    @OneToMany(()=> Order,(orders)=> orders.user)
    orders : Order

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

    @Column({
        type:'enum',
        enum : UserRoleEnums,
        default :UserRoleEnums.USER
    })
    role:UserRoleEnums;

}
