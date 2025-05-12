import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";

export default function Footer() {
  return (
    <View className="w-full bg-gray-900 px-6 pt-10 pb-4">
      <View className="flex flex-col md:flex-row md:justify-between md:items-start space-y-10 md:space-y-0 gap-6">
        
        <View className="flex-1 items-center">
          <Image
            source={require("../assets/logo-cyna.webp")}
            style={{ width: 90, height: 36, marginBottom: 16 }}
            resizeMode="contain"
          />
          <Text className="text-gray-300 text-sm text-center">
            Cyna est une plateforme moderne pour découvrir, acheter et gérer vos produits tech en toute simplicité.
          </Text>
        </View>


        <View className="flex-1 items-center">
          <View className="flex-row justify-center items-start gap-10">

            <View className="items-center">
              <Text className="text-white font-bold mb-3">Informations</Text>
              <View className="space-y-2 items-center">
                <Link href="/legal/mentions-legales">
                  <Text className="text-gray-300 text-sm text-center">Mentions légales</Text>
                </Link>
                <Link href="/legal/politique-confidentialite">
                  <Text className="text-gray-300 text-sm text-center">Confidentialité</Text>
                </Link>
                <Link href="/legal/cgu">
                  <Text className="text-gray-300 text-sm text-center">CGU</Text>
                </Link>
              </View>
            </View>

            <View className="items-center">
              <Text className="text-white font-bold mb-3">Liens utiles</Text>
              <View className="space-y-2 items-center">
                <Link href="/contact">
                  <Text className="text-gray-300 text-sm text-center">Contact</Text>
                </Link>
                <Link href="/about">
                  <Text className="text-gray-300 text-sm text-center">À propos</Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
        

        <View className="flex-1 items-start">
          <Text className="text-white font-bold mb-3">Suivez-nous</Text>
          <View className="flex-row space-x-5 mb-4">
            <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
              <FontAwesome name="facebook" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
              <FontAwesome name="twitter" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
              <FontAwesome name="instagram" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/company/cyna-it/")}>
              <FontAwesome name="linkedin" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text className="text-gray-500 text-xs text-center pt-8">
        © {new Date().getFullYear()} Cyna. Tous droits réservés.
      </Text>
    </View>
  );
}