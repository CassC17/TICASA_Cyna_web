export class ProductDTO {
    id: number;
    name: string;
    price: number;
    fournisseur: string;
    description: string;
    image: string;
    categoryId: number;
    activePromoId?: number | null;
  
    constructor(
      id: number,
      name: string,
      price: number,
      fournisseur: string,
      description: string,
      image: string,
      categoryId: number,
      activePromoId?: number | null
    ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.fournisseur = fournisseur;
      this.description = description;
      this.image = image;
      this.categoryId = categoryId;
      this.activePromoId = activePromoId ?? null;
    }
  }
  