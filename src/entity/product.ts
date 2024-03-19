import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Address } from "./address"
import { Order } from "./order"

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    createdAt!: Date

    @Column()
    updatedAt!: Date

    @ManyToOne(() => Order, order => order.products)
    orders: Order[];
}