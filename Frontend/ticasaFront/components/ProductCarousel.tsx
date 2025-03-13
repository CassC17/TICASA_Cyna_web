import React from "react";
import { FlatList, Dimensions, View } from "react-native";
import ProductResume from "./ProductResume";

interface Product {
  id: number;
  nom: string;
  image: string;
  price: number;
  description?: string;
  isPromoted?: boolean;
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 3 - 16; // Display 3 items at a time
  const promotedProducts = products.filter((product) => product.isPromoted);

  return (
    <FlatList
      data={promotedProducts}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      snapToInterval={itemWidth + 16} // Enable snapping
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: 8 }}
      renderItem={({ item }) => (
        <View style={{ width: itemWidth }}>
          <ProductResume prodPromoted={item} />
        </View>
      )}
    />
  );
}
