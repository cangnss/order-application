import { Router } from "express";
import { CustomerController } from "../controllers/customerController";

export const customerRoutes = Router();

const customerControllers = new CustomerController();

customerRoutes.get("/", customerControllers.getAllCustomers);