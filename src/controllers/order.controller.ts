import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/order";

export class OrderController{
    private orderRepository = AppDataSource.getRepository(Order);

    getAllOrders = async (req:Request, res:Response) => {
        try {
            const orders = await this.orderRepository.find();
            res.status(200).send({ success: true, data: orders })
        } catch (error) {
            console.log("Get All Orders Error: ", error)
            res.status(500).send({ success: false, message: "Get All Orders Error!"})
        }
    }

    getOrder = async (req:Request, res:Response) => {
        try {
            const order = await this.orderRepository.findOneBy({ id: parseInt(req.params.orderId) });
            if (order == null) {
                return res.status(404).send({ success: false, message: "Order not found!" })
            }
            res.status(200).send({ success: true, data: order })
        } catch (error) {
            console.log("Get All Orders Error: ", error)
            res.status(500).send({ success: false, message: "Get All Orders Error!"})
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
            res.status(201).send({ success: true, message: "Order is added!" })
        } catch (error) {
            console.log("Add orders error!", error);
            res.status(500).send({ success: false, message: "Add orders error!"})
        }
    }

    updateOrder = async (req:Request, res:Response) => {
        try {
            const { quantity, price, status, product_id, address_id } = req.body;
            const order = await this.orderRepository.findOneBy({ id: parseInt(req.params.orderId) })
            if (order == null) {
                return res.status(404).send({ success: false, message: "Order not found!" })
            }else{
                order.quantity = quantity;
                order.price = price;
                order.status = status;
                order.products = product_id;
                order.address = address_id;
                order.updatedAt = new Date();
                await this.orderRepository.save(order);
                res.status(200).send({ success: true, message: "Order is updated!" })
            }
        } catch (error) {
            console.log("Update order error!", error)
            res.status(500).send({ success: false, message: "Update order error!" })
        }
    }

    deleteOrder = async (req:Request, res:Response) => {
        try {
            const order = await this.orderRepository.findOneBy({ id: parseInt(req.params.orderId) })
            if (order == null) {
                res.status(404).send({ success: false, message: "Order not found!" })
            }else{
                await this.orderRepository.createQueryBuilder().delete().from(Order).where("id = :id", { id: parseInt(req.params.orderId) }).execute();
                res.status(200).send({ success: true, message: "Order is deleted!" });
            } 
        } catch (error) {
            console.log("Delete order error!", error)
            res.status(500).send({ success: false, message: "Delete order error!" })
        }
    }
}