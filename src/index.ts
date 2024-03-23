import { Express } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import createServer from "./utils/server";
dotenv.config();

const PORT = process.env.PORT || 8080

AppDataSource
    .initialize()
    .then(() => {
        console.log("data source has been initialized!!");
    })
    .catch((err) => {
        console.log("error data source", err);
    })

const app: Express = createServer();

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})