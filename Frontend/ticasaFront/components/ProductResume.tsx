import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Product } from "../types/Product";

// Fonction pour mapper les images locales
const getLocalImage = (imageName: string) => {
  const images: Record<string, any> = {
    "tv.png": require("../assets/products/tv.png"),
    //"laptop.png": require("../assets/products/laptop.png"),
    //"frog.jpg": require("../assets/products/frog.png"),
  };

  return images[imageName] 
};

interface ProductResumeProps {
  prodPromoted: Product;
}

export default function ProductResume({ prodPromoted }: ProductResumeProps) {
  return (
    <View className="w-72 h-48 rounded-lg overflow-hidden shadow-lg m-2">
      <ImageBackground
        source={getLocalImage(prodPromoted.image)} 
        className="w-full h-full justify-end p-4 bg-black/40"
        imageStyle={{ borderRadius: 10 }}
      >
        <Text className="text-black text-lg font-bold">{prodPromoted.name}</Text>
        {prodPromoted.description && (
          <Text className="text-black text-sm truncate">
            {prodPromoted.description.slice(0, 50)}...
          </Text>
        )}
      </ImageBackground>
    </View>
  );
}
