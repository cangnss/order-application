import { Express } from "express";
import supertest = require("supertest")
import createServer from "../utils/server"
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer";

const app: Express = createServer();

type CustomerDto = {
    id: number;
    name: string;
    email: string;
}

const customer = {
    name: "ali can",
    email: "can@gmail.com"
}

const updateCustomer = {
    name: "ali can",
    email: "alicangunes@gmail.com"
}


describe("customer", () => {

    let createdCustomerId: number;
    let createdCustomer: CustomerDto;
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.getRepository(Customer);
        const { status, body } = await supertest(app).post("/api/customer").send(customer);
        if (status == 201) {
            createdCustomerId = body.data.id;
            createdCustomer = {
                id: body.data.id,
                name: body.data.name,
                email: body.data.email
            }
        }
    })
    describe("get all customer", () => {
        it("should return a 200", async () => {
            expect(200).toBe(200)
        });
    })
    describe("get all customer", () => {
        it("should return a 200", async () => {
            await supertest(app).get("/api/customer").expect(200)
        });
    })

    describe("get customer route", () => {
        describe("given the customer does not exist", () => {
            it("should return a 404", async () => {
                const customerId = 1000
                await supertest(app).get(`/api/customer/${customerId}`).expect(404)
            });

            it("should return a 200 status and the customer", async () => {
                const { status, body } = await supertest(app).get(`/api/customer/${createdCustomerId}`)
                expect(status).toBe(200)
                expect(body.success).toBe(true)
                expect(body.data.name).toBe(createdCustomer.name)
                expect(body.data.email).toBe(createdCustomer.email)
            })
        })
    })

    describe("create customer route", () => {
        it("should return a 200 status and create the customer", async () => {
            const { status, body } = await supertest(app).post("/api/customer").send(customer);
            expect(status).toBe(201)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Customer is added!")
        })
    })

    describe("update customer route", () => {
        it("should return a 404", async () => {
            const customerId = 1000;
            const { status, body } = await supertest(app).put(`/api/customer/${customerId}`).send(updateCustomer)
            expect(status).toBe(404)
            expect(body.success).toBe(false)
            expect(body.message).toBe("Customer not found!")
        })

        it("should return a 200", async () => {
            const { status, body } = await supertest(app).put(`/api/customer/${createdCustomerId}`).send(updateCustomer);
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Customer is updated!")
        })
    })

    describe("delete customer route", () => {
        it("should return a 404", async () => {
            const customerId = 1000
            const { status, body } = await supertest(app).delete(`/api/customer/${customerId}`)
            expect(status).toBe(404)
            expect(body.success).toBe(false)
            expect(body.message).toBe("Customer not found!")
        })

        it("should return a 200 and delete the customer", async () => {
            const { status, body } = await supertest(app).delete(`/api/customer/${createdCustomerId}`)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Customer is deleted!")
        })
    })
})