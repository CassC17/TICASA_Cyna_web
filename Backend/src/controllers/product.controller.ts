import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateProductInput, UpdateProductInput } from "../types/product/product.input";

const productService = new ProductService();

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      productInput.description,
      productInput.image,
      productInput.categoryId,
      productInput.activePromoId
    );

    res.status(201).json({ message: "Produit ajouté avec succès", product });
    return;
  } catch (error) {
    next(error);
  }
};

export const modifyProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productId = Number(req.params.id);
    const updateInput = plainToInstance(UpdateProductInput, req.body, {
      excludeExtraneousValues: true,
    });

    const dtoErrors = await validate(updateInput);
    if (dtoErrors.length > 0) {
      res.status(400).json({
        errors: dtoErrors.map(error => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        })),
      });
      return;
    }

    const updatedProduct = await productService.updateProduct(productId, updateInput);

    if (!updatedProduct) {
      const error = new Error("Produit non trouvé");
      (error as any).status = 404;
      throw error;
    }

    res.status(200).json({ message: "Produit mis à jour avec succès", product: updatedProduct });
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productId = Number(req.params.id);
    const deleted = await productService.deleteProduct(productId);
    if (!deleted) {
      const error = new Error("Produit non trouvé");
      (error as any).status = 404;
      throw error;
    }
    res.status(204).send();
    return;
  } catch (error) {
    next(error);
  }
};

export const listProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await productService.listProducts();
    res.status(200).json(products);
    return;
  } catch (error) {
    next(error);
  }
};

export const listPromotedProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await productService.listPromotedProducts();
    res.status(200).json(products);
    return;
  } catch (error) {
    next(error);
  }
};
