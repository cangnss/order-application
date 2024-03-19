import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Address } from "./address"

@Entity()
export class Customer{

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

    @OneToMany(() => Address, address => address.customer)
    addresses: Address[];
}