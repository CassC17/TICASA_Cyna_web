import { View, Text, Image, Button, Pressable } from "react-native";
import React from "react";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types/Product";
import { ProductProps } from "../types/ProductProps";
import { CartItem } from "../types/CartItem";

export default function ProductDetails({ products }: ProductProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...products,
      quantity: 1,
      isSubscription: true, // ou false selon ton besoin
      duration: "month", // ou 'year'
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

      <View className="w-2/3 bg-blue-accent p-6 rounded-tr-lg rounded-br-lg justify-center">
        <Text className="text-white text-2xl font-bold mb-2">
          {products.name}
        </Text>
        <Text className="text-white text-sm mb-4">
          {products.description
            ? products.description.slice(0, 100) + "..."
            : ""}
        </Text>
        <Pressable
          onPress={handleAddToCart}
          className="bg-orange-500 rounded-full px-4 py-3 items-center"
        >
          <Text className="text-primary text-base font-semibold text-center">
            Ajouter au panier
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
