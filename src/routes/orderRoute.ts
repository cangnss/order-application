import { Router } from "express";
import { checkOrderId, validateRequest } from "../validations/validateRequest";
import { createOrderSchema } from "../validations/orderSchema";
import { OrderController } from "../controllers/order.controller";

export const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.post("/", validateRequest(createOrderSchema), orderController.addOrders);
orderRoutes.put("/:orderId", checkOrderId, validateRequest(createOrderSchema), orderController.updateOrder);
orderRoutes.delete("/:orderId", checkOrderId, orderController.deleteOrder);