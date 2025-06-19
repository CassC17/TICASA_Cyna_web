import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import useGetProductByCategory from "../../hooks/useGetProductByCategory";

export default function ProductsByCategoryPage() {
  const { id } = useLocalSearchParams();
  const { products, isLoading, error } = useGetProductByCategory(Number(id));

  return (
    <View className="flex-1 bg-primary">
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text className="text-red-500 text-center">{error.message}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text className="text-lg text-white">{item.name}</Text>
          )}
        />
      )}
    </View>
  );
}
