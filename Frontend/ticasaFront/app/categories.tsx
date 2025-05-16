import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import useGetCategories from "../hooks/useGetCategories";
import CategoryResume from "../components/CategoryResume";

export default function CategoriesPage() {
  const { categories, isLoading, error } = useGetCategories();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : error ? (
        <Text className="text-center text-red-500 mt-6">
          Erreur: {error.message}
        </Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="w-full">
              <CategoryResume
                category={item}
                onPress={() => console.log(`Category pressed: ${item.id}`)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}
