import { View, Text, ActivityIndicator, Platform } from "react-native";
import React from "react";
import useGetPromotedProducts from "../hooks/useGetPromotedProducts";
import ProductCarousel from "../components/ProductCarousel";
import { Product } from "../types/Product";

export default function Index() {
  const { prodPromoted, isLoading, error } = useGetPromotedProducts();

  // Vérification des données
  if (!Array.isArray(prodPromoted)) {
    return (
      <Text className="text-red-500">
        Erreur : les produits ne sont pas valides
      </Text>
    );
  }

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;
  if (error)
    return <Text className="text-red-500">Error: {error.message}</Text>;

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-xl font-bold mb-4">Promoted Products</Text>
      <View
        className="w-full max-w-screen-lg mx-auto flex-1 mt-8"
        style={Platform.OS === "web" ? { height: 600, justifyContent: "center" } : {}}>
        <ProductCarousel products={prodPromoted as Product[]} />
      </View>
    </View>
  );
}
