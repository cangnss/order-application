import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/order";

export class OrderController{
    private orderRepository = AppDataSource.getRepository(Order);

    getAllOrders = async (req:Request, res:Response) => {
        try {
            const orders = this.orderRepository.find();
            res.status(200).send({ success: true, data: orders })
        } catch (error) {
            console.log("Get All Orders Error: ", error)
            res.status(500).send({ status: false, message: "Get All Orders Error!"})
        }
    }

    addOrders = async (req:Request, res:Response) => {
        try {
            const { quantity, price, status, product_id, address_id, customer_id } = req.body
            const order = new Order();
            order.quantity = quantity;
            order.price = price;
            order.status = status;
            order.products = product_id;
            order.address = address_id;
            order.customer = customer_id;
            order.createdAt = new Date();
            order.updatedAt = new Date();
            await this.orderRepository.save(order);
            res.status(201).send({ status: true, message: "Order is added!" })
        } catch (error) {
            console.log("Add orders error!", error);
            res.status(500).send({ status: false, message: "Add orders error!"})
        }
    }

    updateOrder = async (req:Request, res:Response) => {
        try {
            const { quantity, price, status, product_id, address_id } = req.body;
            const order = await this.orderRepository.findOneBy({ id: parseInt(req.params.orderId) })
            if (order == null) {
                res.status(404).send({ status: false, message: "Order is not found!" })
            }else{
                order.quantity = quantity;
                order.price = price;
                order.status = status;
                order.products = product_id;
                order.address = address_id;
                order.updatedAt = new Date();
                await this.orderRepository.save(order);
                res.status(200).send({ status: true, message: "Order is updated!" })
            }
        } catch (error) {
            console.log("Update order error!", error)
            res.status(500).send({ status: false, message: "Update order error!" })
        }
    }

    deleteOrder = async (req:Request, res:Response) => {
        try {
            const order = await this.orderRepository.findOneBy({ id: parseInt(req.params.orderId) })
            if (order == null) {
                res.status(404).send({ status: false, message: "Order is not found!" })
            }else{
                await this.orderRepository.delete(parseInt(req.params.orderId))
                res.status(200).send({ success: true, message: "Order is deleted!" });
            } 
        } catch (error) {
            console.log("Delete order error!", error)
            res.status(500).send({ status: false, message: "Delete order error!" })
        }
    }
}