import { Router } from "express";
import { checkAddressId, checkProductId, validateRequest } from "../validations/validateRequest";
import { ProductController } from "../controllers/product.controller";
import { createProductSchema } from "../validations/productSchema";

export const productRoutes = Router();

const productController = new ProductController();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:productId", checkProductId, productController.getProduct);
productRoutes.post("/", validateRequest(createProductSchema), productController.addProduct);
productRoutes.put("/:productId", checkProductId, validateRequest(createProductSchema), productController.updateProduct);
productRoutes.delete("/:productId", checkProductId, productController.deleteProduct);