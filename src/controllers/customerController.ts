import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer";
import { Request, Response } from "express";

export class CustomerController{
    private customerRepository = AppDataSource.getRepository(Customer);

    getAllCustomers  = async (req: Request, res: Response) => {
        const customers = await this.customerRepository.find();
        return res.status(200).send(customers)
    }
}