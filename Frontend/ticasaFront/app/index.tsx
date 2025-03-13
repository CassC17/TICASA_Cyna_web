import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

import useGetAllProducts from "../hooks/useGetAllProduct";

import ProductCarousel from "../components/ProductCarousel";

export default function index() {
  const { products, isLoading, error } = useGetAllProducts();

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;
  if (error)
    return <Text className="text-red-500">Error: {error.message}</Text>;

  return (
    <View className="p-4 bg-gray-100">
      <Text className="text-xl font-bold mb-4">Promoted Products</Text>
      <ProductCarousel products={products} />
    </View>
  );
}
