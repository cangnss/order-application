import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Address } from "./address"
import { Product } from "./product"

@Entity()
export class Order{

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

    @OneToMany(() => Product, product => product.orders)
    products: Product[];
}