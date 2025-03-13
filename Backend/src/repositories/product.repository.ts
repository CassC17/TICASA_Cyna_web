import { PrismaClient } from "@prisma/client";
import { ProductEntity } from "../types/product/product.entity";

const prisma = new PrismaClient();

export class ProductRepository {
  async createProduct(
    name: string,
    price: number,
    fournisseur: string,
    description: string,
    image: string,
    categoryId: number,
    activePromoId?: number | null
  ): Promise<ProductEntity> {
    const product = await prisma.product.create({
      data: { name, price, fournisseur, description, image, categoryId, activePromoId },
    });

    return new ProductEntity(
      product.id,
      product.name,
      product.price,
      product.fournisseur,
      product.description,
      product.image,
      product.categoryId,
      product.activePromoId
    );
  }

  async updateProduct(id: number, data: Partial<ProductEntity>): Promise<ProductEntity | null> {
    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return new ProductEntity(
      product.id,
      product.name,
      product.price,
      product.fournisseur,
      product.description,
      product.image,
      product.categoryId,
      product.activePromoId
    );
  }

  async deleteProduct(id: number): Promise<boolean> {
    await prisma.product.delete({ where: { id } });
    return true;
  }

  async listProducts(): Promise<ProductEntity[]> {
    const products = await prisma.product.findMany();
    return products.map(product => new ProductEntity(
      product.id,
      product.name,
      product.price,
      product.fournisseur,
      product.description,
      product.image,
      product.categoryId,
      product.activePromoId
    ));
  }

async listPromotedProducts(): Promise<ProductEntity[]> {
    const products = await prisma.product.findMany({
      where: { activePromoId: { not: null } },
    });
    return products.map(product => new ProductEntity(
      product.id,
      product.name,
      product.price,
      product.fournisseur,
      product.description,
      product.image,
      product.categoryId,
      product.activePromoId
    ));
  }
}
