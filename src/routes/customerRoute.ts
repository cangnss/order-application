import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";

export const customerRoutes = Router();

const customerControllers = new CustomerController();

customerRoutes.get("/", customerControllers.getAllCustomers);