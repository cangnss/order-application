import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";
import { validateRequest, checkCustomerId } from "../validations/validateRequest"
import { createCustomerSchema, updateCustomerSchema } from "../validations/customerSchema"

export const customerRoutes = Router();

const customerControllers = new CustomerController();

customerRoutes.get("/", customerControllers.getAllCustomers);
customerRoutes.post("/", validateRequest(createCustomerSchema), customerControllers.addCustomer);
customerRoutes.put("/:customerId", checkCustomerId, validateRequest(updateCustomerSchema), customerControllers.updateCustomer);
customerRoutes.delete("/:customerId", checkCustomerId, customerControllers.deleteCustomer);