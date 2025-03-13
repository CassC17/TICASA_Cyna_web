import React from "react";
import { FlatList, Dimensions, View, Text } from "react-native";
import ProductResume from "./ProductResume";
import { Product } from "../types/Product"; // ✅ Import correct du type Product

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 3 - 16; // Affichage de 3 articles à la fois

  // Vérification que products est bien un tableau
  if (!Array.isArray(products)) {
    return <Text>Erreur : les produits ne sont pas un tableau valide</Text>;
  }

  // Filtrer les produits promus uniquement
  const promotedProducts = products.filter((product) => product.activePromoId !== null);

  return (
    <FlatList
      data={promotedProducts}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      snapToInterval={itemWidth + 16} // Activation du snapping
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: 8 }}
      renderItem={({ item }) => (
        <View style={{ width: itemWidth, marginHorizontal: 8 }}>
          <ProductResume prodPromoted={item} />
          {/* ✅ Vérification et encapsulation correcte de Text */}

        </View>
      )}
    />
  );
}
