import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Customer } from "./customer"
import { Order } from "./order"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    addressLine!: string

    @Column()
    city!: string

    @Column()
    country!: string

    @Column()
    cityCode!: string

    @ManyToOne(() => Customer, customer => customer.addresses)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;

    @OneToMany(() => Order, order => order.address)
    orders: Order;
}