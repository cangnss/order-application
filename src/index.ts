import "reflect-metadata"
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";
import { customerRoutes } from "./routes/customerRoute";
dotenv.config();

const PORT = process.env.PORT || 8080

AppDataSource
    .initialize()
    .then(() => {
        console.log("data source has been initialized!!");
    })
    .catch((err) => {
        console.log("error data source");
    })

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/customer", customerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})