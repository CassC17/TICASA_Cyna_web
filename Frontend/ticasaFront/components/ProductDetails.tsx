import { View, Text, Image, Button } from "react-native";
import React from "react";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types/Product";
import { ProductProps } from "../types/ProductProps";
import { CartItem } from '../types/CartItem';

export default function ProductDetails({ products }: ProductProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...products,
      quantity: 1,
      isSubscription: true, // ou false selon ton besoin
      duration: 'month', // ou 'year'
    };
    addItem(cartItem);
  };

  return (
    <View className="flex-row w-full bg-white rounded-lg overflow-hidden shadow-lg m-2">
      <View className="w-1/3 p-4 flex items-center">
        <Image
          source={{ uri: products.image }}
          className="w-full h-32 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-center text-blue-500 font-semibold mt-2">
          ${products.price.toFixed(2)}
        </Text>
      </View>

      <View className="w-2/3 bg-gray-300 p-6 rounded-r-lg justify-center">
        <Text className="text-black text-2xl font-bold mb-2">
          {products.name}
        </Text>
        <Text className="text-black text-base leading-5">
          {products.description ? products.description.slice(0, 100) + "..." : ""}
        </Text>
        <Button title="Ajouter au panier" onPress={handleAddToCart} />
      </View>
    </View>
  );
}