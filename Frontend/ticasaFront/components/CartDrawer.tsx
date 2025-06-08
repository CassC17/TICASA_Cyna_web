import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useCart } from '../contexts/CartContext';
import CartSummary from './CartSummary'; // 👈 importe le résumé

const CartDrawer = () => {
  const { isCartOpen, cartItems, toggleCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <View className="absolute right-0 top-0 bottom-0 mt-16 w-72 bg-white p-5 shadow-lg z-50">
      <Pressable onPress={toggleCart} className="self-end mb-2">
        <Text className="text-lg">X</Text>
      </Pressable>
      <Text className="text-2xl font-bold mb-3">Mon Panier</Text>

      {cartItems.length === 0 ? (
        <Text className="italic text-gray-500">Votre panier est vide</Text>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Text key={index} className="my-1">
              {item.name} - {item.price}€ x {item.quantity} {item.isSubscription ? `(${item.duration})` : ''}
            </Text>
          ))}

          <CartSummary /> {/* 👈 ajout du bouton ici */}
        </>
      )}
    </View>
  );
};

export default CartDrawer;
