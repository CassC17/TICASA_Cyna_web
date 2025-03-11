import { PrismaClient } from "@prisma/client";
import { ProductEntity } from "../types/product/product.entity";

const prisma = new PrismaClient();

export class ProductRepository {
  async createProduct(
    name: string,
    price: number,
    fournisseur: string,
    categoryId: number,
    activePromoId?: number | null
  ): Promise<ProductEntity> {
    const product = await prisma.product.create({
      data: { name, price, fournisseur, categoryId, activePromoId },
    });

    return new ProductEntity(
      product.id,
      product.name,
      product.price,
      product.fournisseur,
      product.categoryId,
      product.activePromoId
    );
  }
}
