import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Link } from "expo-router";

export default function Footer() {
  return (
    <View className="w-full bg-gray-900 p-4 flex-row items-center justify-between space-x-8">
      <View className="flex-row space-x-4">
        <Link href="#">
          <Text className="text-white text-sm">CGU</Text>
        </Link>
        <Link href="#">
          <Text className="text-white text-sm">Mentions légales</Text>
        </Link>
        <Link href="/contact">
          <Text className="text-white text-sm">Contact</Text>
        </Link>
      </View>
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
