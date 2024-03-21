import { AppDataSource } from "../data-source";
import { Address } from "../entity/address";
import { Customer } from "../entity/customer";
import { Request, Response } from "express";

export class AddressController {
    private addressRepository = AppDataSource.getRepository(Address);

    getAllAddress = async (req: Request, res: Response) => {
        try {
            const addresses = await this.addressRepository.find();
            return res.status(200).send({ success: true, data: addresses })
        } catch (error) {
            console.log("GetAllAddress Error: ", error)
            return res.status(500).send({ success: false, message: "GetAllAddress Error!" })
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

            await this.addressRepository.save(newAddress);

            return res.status(200).send({ success: true, message: "Address is added!" });
        } catch (error) {
            console.log("Add Address Error: ", error);
            return res.status(500).send({ success: false, message: "Failed to add address" });
        }
    }

    updateAddress = async (req: Request, res: Response) => {
        try {
            const { addressLine, city, country, cityCode, customer_id } = req.body
            const address = await this.addressRepository.findOneBy({ id: parseInt(req.params.addressId) })

            if (address == null) {
                res.status(404).send({ success: false, message: "Address not found!" })
            } else {
                address.addressLine = addressLine;
                address.city = city;
                address.country = country;
                address.cityCode = cityCode;

                await this.addressRepository.save(address);
                res.status(200).send({ success: true, message: "Address is updated!" });
            }
        } catch (error) {
            console.log("Update Address Error: ", error);
            return res.status(500).send({ success: false, message: "Update Address Error" });
        }
    }

    deleteAddress = async (req: Request, res: Response) => {
        try {
            const address = await this.addressRepository.findOneBy({ id: parseInt(req.params.addressId) })
            if (address == null) {
                res.status(404).send({ success: false, message: "Address not found!" })
            } else {
                await this.addressRepository.delete(parseInt(req.params.addressId))
                res.status(200).send({ success: true, message: "Address is deleted!" });
            }
        } catch (error) {
            console.log("Delete Address Error: ", error);
            return res.status(500).send({ success: false, message: "Delete Address Error" });
        }
    }
}