export class ProductEntity {
    id: number;
    name: string;
    price: number;
    fournisseur: string;
    categoryId: number;
    activePromoId?: number | null;
  
    constructor(
      id: number,
      name: string,
      price: number,
      fournisseur: string,
      categoryId: number,
      activePromoId?: number | null
    ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.fournisseur = fournisseur;
      this.categoryId = categoryId;
      this.activePromoId = activePromoId ?? null;
    }
  }
  