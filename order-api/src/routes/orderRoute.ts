import { Router } from "express";
import { checkOrderId, validateRequest } from "../validations/validateRequest";
import { createOrderSchema } from "../validations/orderSchema";
import { OrderController } from "../controllers/order.controller";
import cron from "node-cron"

export const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.get("/:orderId", checkOrderId, orderController.getOrder);
orderRoutes.post("/", validateRequest(createOrderSchema), orderController.addOrders);
orderRoutes.put("/:orderId", checkOrderId, validateRequest(createOrderSchema), orderController.updateOrder);
orderRoutes.delete("/:orderId", checkOrderId, orderController.deleteOrder);

cron.schedule('0 0 0 * * *', async () => {
    try {
        orderController.getOrdersForCron();
    } catch (error) {
        console.error('İstek gönderme sırasında bir hata oluştu:', error);
    }
});