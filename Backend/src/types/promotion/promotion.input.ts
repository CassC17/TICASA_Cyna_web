export interface CreatePromotionInput {
    name: string;
    priceReduction?: number;
  }
  
  export interface UpdatePromotionInput {
    id: number;
    name?: string;
    priceReduction?: number;
  }
  