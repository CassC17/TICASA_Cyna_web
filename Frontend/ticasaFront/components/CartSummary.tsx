import React from 'react';
import { View, Text, Button } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { createStripeSession } from '../utils/stripe';
import { router } from 'expo-router';

const CartSummary = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    createStripeSession(cartItems, 'user@example.com');
  };

  return (
    <View className="mt-4">
      <Text className="text-lg font-semibold mb-2">
        Total : {total.toFixed(2)} €
      </Text>
      <Button title="Passer à la caisse" onPress={() => router.push('/checkout')} />
    </View>
  );
};

export default CartSummary;
