import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Address } from "./address"
import { Order } from "./order"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    imageUrl!: string

    @Column()
    name!: string

    @OneToMany(() => Order, order => order.products)
    orders: Order;
}