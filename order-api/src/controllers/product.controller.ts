import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/product";

export class ProductController{
    private productRepository = AppDataSource.getRepository(Product);

    getAllProducts = async (req:Request, res:Response) => {
        try {
            const products = await this.productRepository.find();
            return res.status(200).send({ success: true, data: products })
        } catch (error) {
            console.log("Get All Product error", error);
            res.status(500).send({ status: false, message: "Get All Product Error!"})
        }
    }

    getProduct = async (req:Request, res:Response) => {
        try {
            const product = await this.productRepository.findOneBy({ id: parseInt(req.params.productId) });
            if (product == null) {
                return res.status(404).send({ success: false, message: "Product not found!" })
            }else{
                return res.status(200).send({ success: true, data: product })
            }
        } catch (error) {
            console.log("Get All Product error", error);
            res.status(500).send({ success: false, message: "Get All Product Error!"})
        }
    }
    
    addProduct = async (req:Request, res:Response) => {
        try {
            const { imageUrl, name } = req.body
            const product = new Product();
            product.imageUrl = imageUrl;
            product.name = name;
            await this.productRepository.save(product);
            res.status(201).send({ success: true, message: "Product is added!", data: product })
        } catch (error) {
            console.log("Add Product error", error);
            res.status(500).send({ success: false, message: "Add Product error"})
        }
    }

    updateProduct = async (req:Request, res:Response) => {
        try {
            const { imageUrl, name } = req.body
            const product = await this.productRepository.findOneBy({ id: parseInt(req.params.productId) })
            if (product == null) {
                res.status(404).send({ success: false, message: "Product not found!" })
            }else{
                product.imageUrl = imageUrl;
                product.name = name;
                await this.productRepository.save(product);
                res.status(200).send({ success: true, message: "Product is updated!" });
            }
        } catch (error) {
            console.log("Update Product error", error);
            res.status(500).send({ success: false, message: "Update Product error"})
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            const product = await this.productRepository.findOneBy({ id: parseInt(req.params.productId) })
            if (product == null) {
                res.status(404).send({ success: false, message: "Product not found!" })
            } else {
                await this.productRepository.delete(parseInt(req.params.productId))
                res.status(200).send({ success: true, message: "Product is deleted!" });
            }
        } catch (error) {
            console.log("Delete Product Error: ", error);
            return res.status(500).send({ success: false, message: "Delete Product Error" });
        }
    }
}