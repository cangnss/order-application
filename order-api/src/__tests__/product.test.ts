import { Express } from "express";
import supertest = require("supertest")
import createServer from "../utils/server"
import { AppDataSource } from "../data-source";
import { Product } from "../entity/product";

const app: Express = createServer();

const product = {
    imageUrl: "test image url",
    name: "test product"
}

const updateProduct = {
    imageUrl: "update test image url",
    name: "update test product"
}


describe("product", () => {

    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.getRepository(Product);
    })

    describe("get all product", () => {
        it("should return a 200", async () => {
            await supertest(app).get("/api/products").expect(200)
        });
    })

    describe("get product route", () => {
        describe("given the product does not exist", () => {
            it("should return a 404", async () => {
                const productId = 1000
                await supertest(app).get(`/api/products/${productId}`).expect(404)
            });
            
            it("should return a 200 status and the product", async () => {
                const productId = 1
                const { status, body } = await supertest(app).get(`/api/products/${productId}`)
                expect(status).toBe(200)
                expect(body.success).toBe(true)
                expect(body.data.imageUrl).toBe("testurl")
                expect(body.data.name).toBe("Mont")
            })
        })
    })

    describe("create product route", () => {
        it("should return a 201 status and create the product", async () => {
            const { status, body } = await supertest(app).post("/api/products").send(product);
            expect(status).toBe(201)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Product is added!")
        })
    })

    describe("update product route", () => {
        it("should return a 404", async () => {
            const productId = 1000;
            const { status, body } = await supertest(app).put(`/api/products/${productId}`).send(updateProduct)
            expect(status).toBe(404)
            expect(body.success).toBe(false)
            expect(body.message).toBe("Product not found!")
        })

        it("should return a 200", async () => {
            const productId = 2
            const { status, body } = await supertest(app).put(`/api/products/${productId}`).send(updateProduct);
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Product is updated!")
        })
    })

    describe("delete product route", () => {
        it("should return a 404", async () => {
            const productId = 1000
            const { status, body } = await supertest(app).delete(`/api/products/${productId}`)
            expect(status).toBe(404)
            expect(body.success).toBe(false)
            expect(body.message).toBe("Product not found!")
        })

        it("should return a 200 and delete the product", async () => {
            let productId = 10
            const { status, body } = await supertest(app).delete(`/api/products/${productId}`)
            expect(status).toBe(200)
            expect(body.success).toBe(true)
            expect(body.message).toBe("Product is deleted!")
        })
    })
})