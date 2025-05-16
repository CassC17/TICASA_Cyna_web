import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import React from "react";
import useGetPromotedProducts from "../hooks/useGetPromotedProducts";
import ProductCarousel from "../components/ProductCarousel";
import { Product } from "../types/Product";
import Footer from "../components/Footer";

export default function Index() {
  const { prodPromoted, isLoading, error } = useGetPromotedProducts();

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
    <ScrollView className="flex-1 bg-gray-100">
      <Text className="text-xl font-bold mb-4 py-8 text-center">
        Promoted Products
      </Text>

      <View className="w-full max-w-screen-lg mx-auto my-8 h-auto justify-start web:h-[600px] web:justify-center">
        <ProductCarousel products={prodPromoted as Product[]} />
      </View>

      <Footer />
    </ScrollView>
  );
}
