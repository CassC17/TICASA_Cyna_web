import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import useGetPromotedProducts from "../hooks/useGetPromotedProducts";
import ProductCarousel from "../components/ProductCarousel";
import { Product } from "../types/Product";
import Footer from "../components/Footer";

const screenHeight = Dimensions.get("window").height;

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
    <ScrollView
      className="bg-[#302082]"
      contentContainerStyle={{ minHeight: screenHeight, flexGrow: 1 }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      {/* Top section (25%) */}
      <View style={{ height: screenHeight * 0.4 }} />

      {/* Carousel section (35%) */}
      <View
        className="justify-center items-center px-4"
        style={{ height: screenHeight * 0.4 }}
      >
        <Text className="text-gray-300 text-xl font-bold mb-4">
          Promoted Products
        </Text>
        <View
          className="w-full max-w-screen-lg flex-auto mt-8"
          style={Platform.OS === "web" ? { height: 350 } : {}}
        >
          <ProductCarousel products={prodPromoted as Product[]} />
        </View>
      </View>

      {/* Bottom section (50%) */}
      <View className="px-4 pt-6" style={{ height: screenHeight * 0.5 }}>
        <View className="bg-white rounded-xl p-4 shadow-md">
          <Text className="text-lg font-semibold mb-2 text-[#302082]">
            Découvrez nos offres exclusives
          </Text>
          <Text className="text-white">
            Restez à l'affût des dernières nouveautés et promotions à ne pas
            manquer. Des produits sélectionnés rien que pour vous.
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
