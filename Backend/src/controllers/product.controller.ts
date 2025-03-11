import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateProductInput } from "../types/product/product.input";

const productService = new ProductService();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productInput = plainToInstance(CreateProductInput, req.body, {
      excludeExtraneousValues: true,
    });

    const dtoErrors = await validate(productInput);
    if (dtoErrors.length > 0) {
      res.status(400).json({
        errors: dtoErrors.map(error => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        })),
      });
      return;
    }

    const product = await productService.createProduct(
      productInput.name,
      productInput.price,
      productInput.fournisseur,
      productInput.categoryId,
      productInput.activePromoId
    );

    res.status(201).json({ message: "Produit ajouté avec succès", product });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the product" });
  }
};
