import { Router } from "express";
import { AddressController } from "../controllers/address.controller";
import { createAddressSchema } from "../validations/addressSchema";
import { checkAddressId, validateRequest } from "../validations/validateRequest";

export const addressRoutes = Router();

const addressControllers = new AddressController();

addressRoutes.get("/", addressControllers.getAllAddress);
addressRoutes.get("/:addressId", checkAddressId, addressControllers.getAddress);
addressRoutes.post("/", validateRequest(createAddressSchema), addressControllers.addAddress);
addressRoutes.put("/:addressId", checkAddressId, validateRequest(createAddressSchema), addressControllers.updateAddress);
addressRoutes.delete("/:addressId", checkAddressId, addressControllers.deleteAddress);