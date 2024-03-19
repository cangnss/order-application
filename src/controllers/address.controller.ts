import { AppDataSource } from "../data-source";
import { Address } from "../entity/address";
import { Customer } from "../entity/customer";
import { Request, Response } from "express";

export class AddressController {
    private addressRepository = AppDataSource.getRepository(Customer);

    getAllAddress = async (req: Request, res: Response) => {
        try {
            const addresses = await this.addressRepository.find();
            return res.status(200).send(addresses)
        } catch (error) {
            console.log("GetAllCustomers Error: ", error)
        }
    }

    addAddress = async (req: Request, res: Response) => {
        try {
            const { addressLine, city, country, cityCode, customer_id } = req.body;
    
            const newAddress = new Address();
            newAddress.addressLine = addressLine;
            newAddress.city = city;
            newAddress.country = country;
            newAddress.cityCode = cityCode;
            newAddress.customer = customer_id;
    
            // await this.addressRepository.save(newAddress);
    
            return res.status(200).send({ success: true, message: "Address is added!" });
        } catch (error) {
            console.log("Add Address Error: ", error);
            return res.status(500).send({ success: false, message: "Failed to add address" });
        }
    }
}