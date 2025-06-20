import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

const categoryImages: Record<string, any> = {
  "cat_soc.png": require("../assets/products/cat_soc.png"),
  "cat_edr.png": require("../assets/products/cat_edr.png"),
  "cat_xdr.png": require("../assets/products/cat_xdr.png"),
};

export default function CategoryGridItem({ category }: { category: any }) {
    return (
        <Pressable
            onPress={() => router.push(`/categories/${category.id}`)}
            className="w-[48%] mb-4 mr-2 bg-white rounded-lg shadow-md overflow-hidden"
        >
<Image
  source={categoryImages[category.image] || require("../assets/products/default.png")}
  className="w-full h-32"
  resizeMode="cover"
/>

            <View className="p-2">
                <Text className="text-center font-semibold text-gray-800">{category.name}</Text>
            </View>
        </Pressable>
    );
}