import { Express } from "express";
import supertest = require("supertest")
import createServer from "../utils/server"
import { AppDataSource } from "../data-source";
import { Order } from "../entity/order";

const app: Express = createServer();

type CustomerDto = {
    name: string;
    email: string;
}

type AddressDto = {
    addressLine: string;
    city: string;
    country: string;
    cityCode: string;
    customer_id: number;
}

type ProductDto = {
    imageUrl: string;
    name: string;
}

type OrderDto = {
    quantity: number;
    price: number;
    status: string;
    product_id: number;
    address_id: number;
    customer_id: number;
    createdAt: Date;
    updatedAt: Date;
}
type UpdOrderDto = {
    quantity: number;
    price: number;
    status: string;
    product_id: number;
    address_id: number;
    customer_id: number;
}

describe("order", () => {
    let createdOrderId: number;
    let createdOrder: OrderDto;
    let updateOrder: UpdOrderDto;
    let productId: number;
    let customerId: number;
    let addressId: number;
    let customer: CustomerDto;
    let address: AddressDto;
    let product: ProductDto;
    let orderRepository: any;

    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.getRepository(Order);
        orderRepository = AppDataSource.getRepository(Order);
        product = {
            imageUrl: "test image url",
            name: "test product"
        }
        customer = {
            name: "ali can",
            email: "can@gmail.com"
        }
        let customerResponse = await supertest(app).post("/api/customer").send(customer);
        let productResponse = await supertest(app).post("/api/products").send(product);
        let addressResponse;
        customerId = customerResponse.body.data.id
        productId = productResponse.body.data.id
        address = {
            addressLine: "Test Address",
            city: "Test",
            country: "Turkey",
            cityCode: "00",
            customer_id: customerId
        }
        addressResponse = await supertest(app).post("/api/address").send(address);
        addressId = addressResponse.body.data.id
        createdOrder = {
            quantity: 1,
            price: 500,
            status: "Pending",
            product_id: productId,
            address_id: addressId,
            customer_id: customerId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        updateOrder = {
            quantity: 2,
            price: 800,
            status: "On Way",
            product_id: productId,
            address_id: addressId,
            customer_id: customerId
        }
        if (addressResponse?.status == 201 && productResponse.status == 201 && customerResponse.status == 201) {
            const res = await orderRepository.save(createdOrder);
            createdOrderId = res.id;
        }
    })

    describe("get all orders", () => {
        it("should return a 200", async () => {
            await supertest(app).get("/api/orders").expect(200)
        });
    })

    describe("create order route", () => {
        it("should return a 201 status and create the order", async () => {
            const res = await orderRepository.save(createdOrder);
            expect(res.id).toBe(createdOrderId);
        })
    })

    describe("get order route", () => {
        it("should return a 404", async () => {
            const orderId = 1000
            await supertest(app).get(`/api/orders/${orderId}`).expect(404)
        });

        it("should return a 200 status and the order", async () => {
            const { status, body } = await supertest(app).get(`/api/orders/${createdOrderId}`)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.data.quantity).toBe(createdOrder.quantity)
            expect(body.data.price).toBe(createdOrder.price)
            expect(body.data.status).toBe(createdOrder.status)
        })
    })

    describe("update order route", () => {
        it("should return a 404", async () => {
            const orderId = 1000;
            const { status, body } = await supertest(app).put(`/api/orders/${orderId}`).send(updateOrder)
            expect(status).toBe(404)
            expect(body.success).toBe(false)
            expect(body.message).toBe("Order not found!")
        })

        it("should return a 200", async () => {
            const { status, body } = await supertest(app).put(`/api/orders/${createdOrderId}`).send(updateOrder);
            console.log("body: ", body)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Order is updated!")
        })
    })

    describe("delete order route", () => {
        it("should return a 404", async () => {
            const orderId = 1000
            const { status, body } = await supertest(app).delete(`/api/orders/${orderId}`)
            expect(status).toBe(404)
            expect(body.success).toBe(false)
            expect(body.message).toBe("Order not found!")
        })

        it("should return a 200 and delete the order", async () => {
            const { status, body } = await supertest(app).delete(`/api/orders/${createdOrderId}`)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Order is deleted!")
        })
    })
})