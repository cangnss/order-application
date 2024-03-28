import express, { Express } from "express";
import bodyParser from "body-parser";
import expressWinston from "express-winston"
import { customerRoutes } from "../routes/customerRoute";
import { addressRoutes } from "../routes/addressRoute";
import { productRoutes } from "../routes/productRoute";
import { orderRoutes } from "../routes/orderRoute";
import { format, transports } from "winston";
import { logger, internalErrorLogger } from "./logger";

function createServer() {
    const app: Express = express();

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true
    }))

    app.use(expressWinston.errorLogger({
        winstonInstance: internalErrorLogger
    }))

    app.use("/api/customer", customerRoutes);
    app.use("/api/address", addressRoutes)
    app.use("/api/products", productRoutes)
    app.use("/api/orders", orderRoutes)

    return app;
}

export default createServer;