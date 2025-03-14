import { View, Text, Image } from "react-native";
import React from "react";

interface Product {
  id: number;
  nom: string;
  image: string;
  price: number;
  description?: string;
}

interface ProductsProps {
  products: Product;
}

export default function ProductDetails({ products }: ProductsProps) {
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
        <Text className="text-black text-2xl font-extrabold mb-2">
          {products.nom}
        </Text>
        {products.description && (
          <Text className="text-black text-base leading-5">
            {products.description.slice(0, 100)}...
          </Text>
        )}
      </View>
    </View>
  );
}
