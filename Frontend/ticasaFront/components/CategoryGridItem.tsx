import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

export default function CategoryGridItem({ category }: { category: any }) {
    return (
        <Pressable
            onPress={() => router.push(`/categories/${category.id}`)}
            className="w-[48%] mb-4 mr-2 bg-white rounded-lg shadow-md overflow-hidden"
        >
            <Image
                source={{ uri: category.image }}
                className="w-full h-32"
                resizeMode="cover"
            />
            <View className="p-2">
                <Text className="text-center font-semibold text-gray-800">{category.name}</Text>
            </View>
        </Pressable>
    );
}