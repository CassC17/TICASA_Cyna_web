import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import useGetAllProducts from "../hooks/useGetAllProduct";

export default function SearchResults() {
    const { query } = useLocalSearchParams();
    const searchQuery = Array.isArray(query) ? query[0] : query || "";

    const { products, isLoading, error } = useGetAllProducts();

    const finalProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
        <View className="p-4">
            <Text className="text-lg font-bold text-black">Résultats pour : {query}</Text>
        </View>

        <View className="flex-1 bg-gray-100 p-4">
            {isLoading ? (
                <ActivityIndicator size="large" color="#3b82f6" />
            ) : error ? (
                <Text className="text-red-500 text-center">{error.message}</Text>
            ) : (
                <FlatList
                    data={finalProducts}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    renderItem={({ item }) => (
                        <View className="bg-gray-50 border border-gray-200 rounded-xl mb-4 px-4 py-3 flex-row items-center space-x-4">
                            <View className="w-20 h-20 bg-gray-200 rounded-lg justify-center items-center"></View>
                            <View className="flex-1">
                                <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>{item.name}</Text>
                                <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>{item.description}</Text>
                                <Text className="text-blue-600 font-bold text-base mt-2">{item.price} €</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
        </>
    );
}