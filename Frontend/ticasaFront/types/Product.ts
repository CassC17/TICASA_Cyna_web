export interface Product {
    id: number;
    name: string; 
    image: string;
    price: number;
    description?: string;
    activePromoId?: number | null; 
}

export default Product;