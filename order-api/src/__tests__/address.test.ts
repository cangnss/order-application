import { Express } from "express";
import supertest = require("supertest")
import createServer from "../utils/server"
import { AppDataSource } from "../data-source";
import { Address } from "../entity/address";

const app: Express = createServer();

type AddressDto = {
    addressLine: string;
    city: string;
    country: string;
    cityCode: string;
    customer_id: number;
}

const customer = {
    name: "ali can",
    email: "can@gmail.com"
}


describe("address", () => {
    let createdAddressId: number;
    let createdAddress: AddressDto;
    let updateAddress: AddressDto;
    let createdCustomerId: number;

    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.getRepository(Address);
        const customerResponse = await supertest(app).post("/api/customer").send(customer);
        createdCustomerId = customerResponse.body.data.id
        createdAddress = {
            addressLine: "Test Address",
            city: "Test",
            country: "Turkey",
            cityCode: "00",
            customer_id: createdCustomerId
        }
        const { status, body } = await supertest(app).post("/api/address").send(createdAddress);
        if (status == 201 && customerResponse.status == 201) {
            createdAddressId = body.data.id;
            updateAddress = {
                addressLine: "Update Test Address",
                city: "Update Test",
                country: "Turkey",
                cityCode: "00",
                customer_id: createdCustomerId
            }
        }
        
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
                const { status, body } = await supertest(app).get(`/api/address/${createdAddressId}`)
                expect(status).toBe(200)
                expect(body.success).toBe(true)
                expect(body.data.addressLine).toBe(createdAddress.addressLine)
                expect(body.data.city).toBe(createdAddress.city)
                expect(body.data.country).toBe(createdAddress.country)
                expect(body.data.cityCode).toBe(createdAddress.cityCode)
            })
        })
    })

    describe("create address route", () => {
        it("should return a 201 status and create the address", async () => {
            const { status, body } = await supertest(app).post("/api/address").send(createdAddress);
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
            const { status, body } = await supertest(app).put(`/api/address/${createdAddressId}`).send(updateAddress);
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
            const { status, body } = await supertest(app).delete(`/api/address/${createdAddressId}`)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Address is deleted!")
        })
    })
})