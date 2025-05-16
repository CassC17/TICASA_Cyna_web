import Product from './Product';

export type CartContextType = {
    cartItems: Product[];
    setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
    isCartOpen: boolean;
    toggleCart: () => void;
    addItem: (item: Product) => void;
    removeItem: (id: string) => void;
};

export default CartContextType;