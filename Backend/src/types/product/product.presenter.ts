import { ProductDTO } from "./product.dto";

export class ProductPresenter {
  static toDTO(product: any): ProductDTO {
    return new ProductDTO(
      product.id,
      product.name,
      product.price,
      product.fournisseur,
      product.categoryId,
      product.activePromoId
    );
  }
}
