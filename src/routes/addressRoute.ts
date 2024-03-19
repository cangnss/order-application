import { Router } from "express";
import { AddressController } from "../controllers/address.controller";

export const addressRoutes = Router();

const addressControllers = new AddressController();

addressRoutes.get("/", addressControllers.getAllAddress);
addressRoutes.post("/", addressControllers.addAddress);