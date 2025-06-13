import { Product } from './Product';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isSubscription?: boolean;
  duration?: "month" | "year";
};

export default CartItem;
