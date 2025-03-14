import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function Footer() {
  return (
    <View className="w-full bg-gray-900 p-4 flex-row items-center justify-between space-x-8">
      <View className="flex-row space-x-4">
        <FontAwesome name="facebook" size={24} color="white" />
        <FontAwesome name="twitter" size={24} color="white" />
        <FontAwesome name="instagram" size={24} color="white" />
        <FontAwesome name="linkedin" size={24} color="white" />
      </View>

      <Text className="text-white text-sm">© 2025 TICASA</Text>
    </View>
  );
}
