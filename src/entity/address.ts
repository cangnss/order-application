import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Customer } from "./customer"

@Entity()
export class Address{

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
    @JoinColumn({ name: "customer_id"})
    customer: Customer;
}