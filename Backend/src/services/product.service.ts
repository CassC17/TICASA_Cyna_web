import { ProductRepository } from "../repositories/product.repository";
import { ProductDTO } from "../types/product/product.dto";
import { ProductPresenter } from "../types/product/product.presenter";

export class ProductService {
  private productRepository = new ProductRepository();

  async createProduct(
    name: string,
    price: number,
    fournisseur: string,
    categoryId: number,
    activePromoId?: number | null
  ): Promise<ProductDTO> {
    const product = await this.productRepository.createProduct(
      name,
      price,
      fournisseur,
      categoryId,
      activePromoId
    );

    return ProductPresenter.toDTO(product);
  }
}
