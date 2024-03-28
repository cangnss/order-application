import "reflect-metadata"
import { DataSource } from "typeorm"
import { Customer } from "./entity/customer"
import { Address } from "./entity/address"
import { Order } from "./entity/order"
import { Product } from "./entity/product"
import dotenv from "dotenv"
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Customer, Address, Order, Product],
    migrations: [],
    subscribers: [],
})