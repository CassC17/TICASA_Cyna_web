import React from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import useGetAllProducts from "../hooks/useGetAllProduct";
import ProductDetails from "../components/ProductDetails";
import Footer from "../components/Footer";

export default function ProductsPage() {
  const { products, isLoading, error } = useGetAllProducts();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="min-h-screen flex flex-col justify-between px-6 py-8">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : error ? (
          <Text className="text-center text-red-500 mt-6">
            Erreur: {error.message}
          </Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="w-full">
                <ProductDetails products={item} />
              </View>
            )}
          />
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}
