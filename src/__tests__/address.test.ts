import { Express } from "express";
import supertest = require("supertest")
import createServer from "../utils/server"
import { AppDataSource } from "../data-source";
import { Address } from "../entity/address";

const app: Express = createServer();

const address = {
    addressLine: "Test Address",
    city: "Test",
    country: "Turkey",
    cityCode: "00",
    customer_id: 1
}

const updateAddress = {
    addressLine: "Update Test Address",
    city: "Update Test",
    country: "Turkey",
    cityCode: "00",
    customer_id: 1
}


describe("address", () => {

    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.getRepository(Address);
    })

    describe("get all address", () => {
        it("should return a 200", async () => {
            await supertest(app).get("/api/address").expect(200)
        });
    })

    describe("get address route", () => {
        describe("given the address does not exist", () => {
            it("should return a 404", async () => {
                const addressId = 1000
                await supertest(app).get(`/api/address/${addressId}`).expect(404)
            });
            
            it("should return a 200 status and the address", async () => {
                const addressId = 1
                const { status, body } = await supertest(app).get(`/api/address/${addressId}`)
                expect(status).toBe(200)
                expect(body.success).toBe(true)
                expect(body.data.addressLine).toBe("Zafertepe mah. dervis özdemir cad.")
                expect(body.data.city).toBe("Ankara")
                expect(body.data.country).toBe("Turkey")
                expect(body.data.cityCode).toBe("06")
            })
        })
    })

    describe("create address route", () => {
        it("should return a 201 status and create the address", async () => {
            const { status, body } = await supertest(app).post("/api/address").send(address);
            expect(status).toBe(201)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Address is added!")
        })
    })

    describe("update address route", () => {
        it("should return a 404", async () => {
            const addressId = 1000;
            const { status, body } = await supertest(app).put(`/api/address/${addressId}`).send(updateAddress)
            expect(status).toBe(404)
            expect(body.success).toBe(false)
            expect(body.message).toBe("Address not found!")
        })

        it("should return a 200", async () => {
            const addressId = 2
            const { status, body } = await supertest(app).put(`/api/address/${addressId}`).send(updateAddress);
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Address is updated!")
        })
    })

    describe("delete address route", () => {
        it("should return a 404", async () => {
            const addressId = 1000
            const { status, body } = await supertest(app).delete(`/api/address/${addressId}`)
            expect(status).toBe(404)
            expect(body.success).toBe(false)
            expect(body.message).toBe("Address not found!")
        })

        it("should return a 200 and delete the address", async () => {
            let addressId = 10
            const { status, body } = await supertest(app).delete(`/api/address/${addressId}`)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Address is deleted!")
        })
    })
})