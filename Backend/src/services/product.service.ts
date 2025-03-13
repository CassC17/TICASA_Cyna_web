import { ProductRepository } from "../repositories/product.repository";
import { ProductDTO } from "../types/product/product.dto";
import { ProductPresenter } from "../types/product/product.presenter";

export class ProductService {
  private productRepository = new ProductRepository();

  async createProduct(
    name: string,
    price: number,
    fournisseur: string,
    description: string,
    image: string,
    categoryId: number,
    activePromoId?: number | null
  ): Promise<ProductDTO> {
    const product = await this.productRepository.createProduct(
      name,
      price,
      fournisseur,
      description,
      image,
      categoryId,
      activePromoId
    );

    return ProductPresenter.toDTO(product);
  }

  async updateProduct(id: number, data: Partial<ProductDTO>): Promise<ProductDTO | null> {
    const product = await this.productRepository.updateProduct(id, data);
    return product ? ProductPresenter.toDTO(product) : null;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return await this.productRepository.deleteProduct(id);
  }

    async listProducts(): Promise<ProductDTO[]> {
      const products = await this.productRepository.listProducts();
      return products.map(product => ProductPresenter.toDTO(product));
    }

    async listPromotedProducts(): Promise<ProductDTO[]> {
      const products = await this.productRepository.listPromotedProducts();
      return products.map(product => ProductPresenter.toDTO(product));
    }
}
