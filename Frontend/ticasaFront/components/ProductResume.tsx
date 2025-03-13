import { View, Text, ImageBackground } from "react-native";
import React from "react";

interface Product {
  id: number;
  nom: string;
  image: string;
  price: number;
  description?: string;
}

interface ProductResumeProps {
  prodPromoted: Product;
}

export default function ProductResume({ prodPromoted }: ProductResumeProps) {
  return (
    <View className="w-72 h-48 rounded-lg overflow-hidden shadow-lg m-2">
      <ImageBackground
        source={{ uri: prodPromoted.image }}
        className="w-full h-full justify-end p-4 bg-black/40"
        imageStyle={{ borderRadius: 10 }}
      >
        <Text className="text-white text-lg font-bold">{prodPromoted.nom}</Text>
        {prodPromoted.description && (
          <Text className="text-white text-sm truncate">
            {prodPromoted.description.slice(0, 50)}...
          </Text>
        )}
      </ImageBackground>
    </View>
  );
}
