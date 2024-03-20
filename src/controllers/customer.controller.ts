import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer";
import { Request, Response } from "express";

export class CustomerController {
    private customerRepository = AppDataSource.getRepository(Customer);

    getAllCustomers = async (req: Request, res: Response) => {
        try {
            const customers = await this.customerRepository.find();
            return res.status(200).send(customers)
        } catch (error) {
            console.log("GetAllCustomers Error: ", error)
        }
    }

    addCustomer = async (req: Request, res: Response) => {
        const { name, email } = await req.body;

        const customer = new Customer();
        customer.name = name;
        customer.email = email;
        customer.createdAt = new Date()
        customer.updatedAt = new Date()

        await this.customerRepository.save(customer);
        res.status(201).send({ success: true, message: "Customer is added!"})
    }

    updateCustomer = async (req: Request, res: Response) => {
        const { name, email } = req.body
        const customer = await this.customerRepository.findOneBy({ id: parseInt(req.params.customerId) })

        if (customer == null) {
            res.status(404).send({ success:false, message: "Customer not found!"})
        }else{
            customer.name = name;
            customer.email = email;
            customer.updatedAt = new Date();
            await this.customerRepository.save(customer);
            res.status(200).send({ success: true, message: "Customer is updated!" });
        }
    }

    deleteCustomer = async (req:Request, res:Response) => {
        const customer = await this.customerRepository.findOneBy({ id: parseInt(req.params.customerId) })
        if (customer == null) {
            res.status(404).send({ success:false, message: "Customer not found!"})
        }else{
            await this.customerRepository.delete(parseInt(req.params.customerId))
            res.status(200).send({ success: true, message: "Customer is deleted!" });
        }
    }
}