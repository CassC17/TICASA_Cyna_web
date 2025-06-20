import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import useGetPromotedProducts from "../hooks/useGetPromotedProducts";
import ProductCarousel from "../components/ProductCarousel";
import { Product } from "../types/Product";
import Footer from "../components/Footer";
import { router } from "expo-router";
import CategoryGridItem from "../components/CategoryGridItem";
import useGetCategories from "../hooks/useGetCategories";

export default function Index() {
  const { prodPromoted, isLoading, error } = useGetPromotedProducts();
  const {
    categories,
    isLoading: catLoading,
    error: catError,
  } = useGetCategories();

  if (!Array.isArray(prodPromoted)) {
    return (
      <Text className="text-red-500 p-4 text-center">
        Erreur : les produits ne sont pas valides
      </Text>
    );
  }

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  if (error)
    return (
      <Text className="text-red-500 p-4 text-center">
        Error: {error.message}
      </Text>
    );

  return (
    <ScrollView className="flex-1 bg-primary">
      <View className="w-full h-56 justify-center items-center">
        <Text className="text-white text-3xl font-bold">
          Bienvenue chez Cyna
        </Text>
        <Text className="text-white text-base mt-2">
          Votre cybersécurité commence ici
        </Text>
      </View>

      <View className="px-4 mt-8 bg-primary">
        <Text className="text-xl font-bold mb-4 text-white text-center mt-10">
          Nos produits en promotion
        </Text>
        <View className="h-[320px]">
          <ProductCarousel products={prodPromoted as Product[]} />
        </View>
      </View>

      <Text className="text-xl font-bold mt-8 mb-8 text-white text-center">
        Parcourez nos catégories
      </Text>

      {catLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : catError ? (
        <Text className="text-red-500 text-center">{catError.message}</Text>
      ) : (
        <View className="flex flex-row flex-wrap justify-between px-4">
          {categories.map((cat) => (
            <CategoryGridItem key={cat.id} category={cat} />
          ))}
        </View>
      )}

      <View className="px-64 mt-8 mb-10 mx-20">
        <Pressable
          className="bg-cta p-4 rounded-xl items-center"
          onPress={() => router.push("/product")}
        >
          <Text className="text-primary text-base font-semibold text-center">
            Voir tous nos services
          </Text>
        </Pressable>
      </View>

      <Footer />
    </ScrollView>
  );
}
