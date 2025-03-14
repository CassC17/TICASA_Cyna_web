export interface Product {
    id: number;
    nom: string; 
    image: string;
    price: number;
    description?: string;
    activePromoId?: number | null; 
  }
  