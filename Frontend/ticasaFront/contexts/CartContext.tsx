import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types/CartItem';
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addItem = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, isCartOpen, toggleCart, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
