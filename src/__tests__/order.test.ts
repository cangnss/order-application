import { Express } from "express";
import supertest = require("supertest")
import createServer from "../utils/server"
import { AppDataSource } from "../data-source";
import { Order } from "../entity/order";

const app: Express = createServer();

const order = {
    quantity: 1,
    price: 500,
    status: "Pending",
    product_id: 1,
    address_id: 2,
    customer_id: 3
}

const updateOrder = {
    quantity: 1,
    price: 500,
    status: "On Way",
    product_id: 1,
    address_id: 2,
    customer_id: 3
}

describe("order", () => {

    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.getRepository(Order);
    })


    // async function seedDatabase(){
    //     const orderRepository = AppDataSource.getRepository(Order)

    //     const ordersToCreate = [
    //         {
    //             quantity: 5,
    //             price: 100,
    //             status: "Pending",
    //             product_id: 1,
    //             address_id: 2,
    //             customer_id: 3
    //         },
    //         {
    //             quantity: 2,
    //             price: 200,
    //             status: "On Way",
    //             product_id: 1,
    //             address_id: 2,
    //             customer_id: 3
    //         },
    //         {
    //             quantity: 3,
    //             price: 50,
    //             status: "Pending",
    //             product_id: 2,
    //             address_id: 1,
    //             customer_id: 1
    //         },
    //     ] 

    //     for (const orderData of ordersToCreate) {
    //         const order = new Order();
    //         order.quantity = orderData.quantity;
    //         order.price = orderData.price;
    //         order.status = orderData.status;
    //         order.products = orderData.product_id;
    //         order.address = orderData.address_id;
    //         order.customer = orderData.customer_id;
    //         order.createdAt = new Date();
    //         order.updatedAt = new Date();

    //         await orderRepository.save(order);
    //     }
    // }


    describe("get all orders", () => {
        it("should return a 200", async () => {
            await supertest(app).get("/api/orders").expect(200)
        });
    })

    describe("get order route", () => {
        describe("given the order does not exist", () => {
            it("should return a 404", async () => {
                const orderId = 1000
                await supertest(app).get(`/api/orders/${orderId}`).expect(404)
            });
            
            it("should return a 200 status and the order", async () => {
                const orderId = 1
                const { status, body } = await supertest(app).get(`/api/orders/${orderId}`)
                expect(status).toBe(200)
                expect(body.success).toBe(true)
                expect(body.data.quantity).toBe(1)
                expect(body.data.price).toBe(700)
                expect(body.data.status).toBe("passive")
            })
        })
    })

    describe("create order route", () => {
        it("should return a 201 status and create the order", async () => {
            const { status, body } = await supertest(app).post("/api/orders").send(order);
            expect(status).toBe(201)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Order is added!")
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
            const orderId = 2
            const { status, body } = await supertest(app).put(`/api/orders/${orderId}`).send(updateOrder);
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
            let orderId = 9
            const { status, body } = await supertest(app).delete(`/api/orders/${orderId}`)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Order is deleted!")
        })
    })
})