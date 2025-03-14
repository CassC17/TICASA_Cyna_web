import React, { useRef } from "react";
import { FlatList, Dimensions, View, Text, Platform } from "react-native";
import ProductResume from "./ProductResume";
import { Product } from "../types/Product";

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth =
    Platform.OS === "web" ? screenWidth * 0.32 : screenWidth * 0.7; // Adjust item width for Web & Mobile
  const spacing = Platform.OS === "web" ? 5 : 12; // Reduced spacing for Web
  const flatListRef = useRef<FlatList<Product>>(null);

  if (!Array.isArray(products)) {
    return <Text>Erreur : les produits ne sont pas un tableau valide</Text>;
  }
  const promotedProducts = products.filter(
    (product) => product.activePromoId !== null
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={promotedProducts}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={Platform.OS === "web"} // Show scrollbar only on Web
        pagingEnabled={Platform.OS !== "web"} // Enable paging on Mobile (iOS/Android), free scroll on Web
        snapToInterval={itemWidth + spacing} // Ensures smooth snapping while allowing free scrolling
        snapToAlignment="center"
        decelerationRate={Platform.OS === "ios" ? "fast" : "normal"}
        bounces={Platform.OS === "ios"} // bouncing  on iOS
        overScrollMode={Platform.OS === "android" ? "never" : "auto"} // Prevent over-scrolling on Android
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - itemWidth) / 6, // Reduced padding on the left
        }}
        getItemLayout={(data, index) => ({
          length: itemWidth + spacing,
          offset: (itemWidth + spacing) * index,
          index,
        })}
        renderItem={({ item }) => (
          <View
            style={{
              width: itemWidth,
              marginHorizontal: spacing / 2,
            }}
          >
            <ProductResume prodPromoted={item} />
          </View>
        )}
      />
    </View>
  );
}
