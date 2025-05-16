import React, { createContext, useContext, useState, ReactNode } from 'react';
import Product from '../types/Product';
import CartContextType from '../types/CartContext';


const CartContext = createContext<CartContextType | undefined>(undefined);


export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};


type CartProviderProps = {
    children: ReactNode;
};


export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const addItem = (item: Product) => {
        setCartItems(prev => [...prev, item]);
    };

    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== Number(id)));
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, isCartOpen, toggleCart, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};
