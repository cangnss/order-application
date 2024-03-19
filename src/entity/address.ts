import { Entity, Column } from "typeorm"

@Entity()
export class Address{

    @Column()
    addressLine!: string

    @Column()
    city!: string

    @Column()
    country!: string

    @Column()
    cityCode!: string
}