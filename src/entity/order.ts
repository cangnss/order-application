import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import { Address } from "./address"
import { Product } from "./product"
import { Customer } from "./customer"

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    quantity!: number

    @Column()
    price!: number

    @Column()
    status!: string

    @Column()
    createdAt!: Date

    @Column()
    updatedAt!: Date

    @ManyToOne(() => Order, order => order.products)
    @JoinColumn({ name: "product_id" })
    products: Product;

    @ManyToOne(() => Address, address => address.orders)
    @JoinColumn({ name: "address_id" })
    address: Address;

    @ManyToOne(() => Customer, customer => customer.orders)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;
}