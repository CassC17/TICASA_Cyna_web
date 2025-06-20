import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import useGetProductByCategory from "../../hooks/useGetProductByCategory";

export default function ProductsByCategoryPage() {
  const { id } = useLocalSearchParams();
  const { products, isLoading, error } = useGetProductByCategory(Number(id));

  return (
    <View className="flex-1 bg-primary p-4">
      {isLoading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : error ? (
        <Text className="text-red-500 text-center">{error.message}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => (
            <View className="bg-gray-50 border border-gray-200 rounded-xl mb-4 px-4 py-3 flex-row items-center space-x-4">
              <View className="w-20 h-20 bg-gray-200 rounded-lg justify-center items-center">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-base font-semibold text-gray-800"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text className="text-sm text-text mt-1" numberOfLines={2}>
                  {item.description}
                </Text>
                <Text className="text-cta font-bold text-base mt-2">
                  {item.price} €
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
