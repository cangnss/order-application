import "reflect-metadata"
import { DataSource } from "typeorm"
import { Customer } from "./entity/customer"
import { Address } from "./entity/address"
import { Order } from "./entity/order"
import { Product } from "./entity/product"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1",
    database: "orderapp-db",
    synchronize: true,
    logging: false,
    entities: [Customer, Address, Order, Product],
    migrations: [],
    subscribers: [],
})