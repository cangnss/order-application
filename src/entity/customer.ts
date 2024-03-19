import { Entity, Column } from "typeorm"

@Entity()
export class Customer{

    @Column()
    id!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    address!: number

    @Column()
    createdAt!: Date

    @Column()
    updatedAt!: Date
}