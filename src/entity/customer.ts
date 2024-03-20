import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Address } from "./address"
import { Order } from "./order"

@Entity()
export class Customer{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    createdAt!: Date

    @Column()
    updatedAt!: Date

    @OneToMany(() => Address, address => address.customer)
    addresses: Address;

    @OneToMany(() => Order, order => order)
    orders: Order;
}