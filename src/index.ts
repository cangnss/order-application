import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";
import { customerRoutes } from "./routes/customerRoute";
import { addressRoutes } from "./routes/addressRoute";
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

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api/customer", customerRoutes);
app.use("/api/address", addressRoutes)

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})