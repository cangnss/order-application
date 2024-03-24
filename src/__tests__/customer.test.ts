import { Express } from "express";
import supertest = require("supertest")
import createServer from "../utils/server"
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer";

const app: Express = createServer();

const customer = {
    name: "ali can",
    email: "can@gmail.com"
}

const updateCustomer = {
    name: "ali can",
    email: "alicangunes@gmail.com"
}


describe("customer", () => {

    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.getRepository(Customer);
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
                const customerId = 1
                const { status, body } = await supertest(app).get(`/api/customer/${customerId}`)
                expect(status).toBe(200)
                expect(body.success).toBe(true)
                expect(body.data.name).toBe("cem")
                expect(body.data.email).toBe("gunes@gmail.com")
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
            const customerId = 5
            const { status, body } = await supertest(app).put(`/api/customer/${customerId}`).send(updateCustomer);
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
            const customerId = 19
            const { status, body } = await supertest(app).delete(`/api/customer/${customerId}`)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Customer is deleted!")
        })
    })
})