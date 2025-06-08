import { Product } from './Product';

export interface CartItem extends Product {
  quantity: number;
  isSubscription: boolean;
  duration?: 'month' | 'year';
}
export default CartItem;
