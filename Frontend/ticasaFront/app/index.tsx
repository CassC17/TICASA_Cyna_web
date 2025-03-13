import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import useGetPromotedProducts from "../hooks/useGetPromotedProducts";
import ProductCarousel from "../components/ProductCarousel";
import { Product } from "../types/Product"; 

export default function Index() {
  const { prodPromoted, isLoading, error } = useGetPromotedProducts();

  // Vérification des données
  if (!Array.isArray(prodPromoted)) {
    return <Text className="text-red-500">Erreur : les produits ne sont pas valides</Text>;
  }

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text className="text-red-500">Error: {error.message}</Text>;

  return (
    <View className="p-4 bg-gray-100">
      <Text className="text-xl font-bold mb-4">Promoted Products</Text>
      <ProductCarousel products={prodPromoted as Product[]} /> {}
    </View>
  );
}
