import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function CategoryGridItem({ category }: { category: any }) {
  return (
    <Pressable
      onPress={() => router.push(`/categories/${category.id}`)}
      className="w-[48%] mb-4 mr-2 bg-blue-100 rounded-lg shadow-md overflow-hidden"
    >
      <View className="p-6 items-center justify-center h-32">
        <Text className="text-center font-semibold text-blue-900 text-lg">
          {category.name}
        </Text>
      </View>
    </Pressable>
  );
}
