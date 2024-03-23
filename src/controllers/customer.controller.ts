import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer";
import { Request, Response } from "express";

export class CustomerController {
    private customerRepository = AppDataSource.getRepository(Customer);

    getAllCustomers = async (req: Request, res: Response) => {
        try {
            const customers = await this.customerRepository.find();
            return res.status(200).send({ success: true, data: customers })
        } catch (error) {
            console.log("GetAllCustomers Error: ", error)
            return res.status(500).send({ success: false, message: "GetAllCustomers Error!" })
        }
    }

    getCustomer = async (req: Request, res: Response) => {
        try {
            const customer = await this.customerRepository.findOneBy({ id: parseInt(req.params.customerId) })
            if (customer == null) {
                res.status(404).send({ success: false, message: "Customer not found!" })
            }else{
                res.status(200).send({ success: true, data: customer })
            }
        } catch (error) {
            console.log("Get Customer Error: ", error)
            return res.status(500).send({ success: false, message: "Get Customer Error!" })
        }
    }

    addCustomer = async (req: Request, res: Response) => {
        try {
            const { name, email } = await req.body;

            const customer = new Customer();
            customer.name = name;
            customer.email = email;
            customer.createdAt = new Date()
            customer.updatedAt = new Date()

            await this.customerRepository.save(customer);
            res.status(201).send({ success: true, message: "Customer is added!" })
        } catch (error) {
            return res.status(500).send({ success: false, message: "Add customer endpoint error!" })
        }
    }

    updateCustomer = async (req: Request, res: Response) => {
        try {
            const { name, email } = req.body
            const customer = await this.customerRepository.findOneBy({ id: parseInt(req.params.customerId) })

            if (customer == null) {
                res.status(404).send({ success: false, message: "Customer not found!" })
            } else {
                customer.name = name;
                customer.email = email;
                customer.updatedAt = new Date();
                await this.customerRepository.save(customer);
                res.status(200).send({ success: true, message: "Customer is updated!" });
            }
        } catch (error) {
            res.status(500).send({ success: false, message: "Update customer endpoint!" })
        }

    }

    deleteCustomer = async (req: Request, res: Response) => {
        try {
            const customer = await this.customerRepository.findOneBy({ id: parseInt(req.params.customerId) })
            if (customer == null) {
                res.status(404).send({ success: false, message: "Customer not found!" })
            } else {
                await this.customerRepository.delete(parseInt(req.params.customerId))
                res.status(200).send({ success: true, message: "Customer is deleted!" });
            }
        } catch (error) {
            res.status(500).send({ success: false, message: "Delete customer endpoint error!" })
        }

    }
}