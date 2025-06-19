import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native-gesture-handler";

export default function LoginOrGuest() {
  const continueAsGuest = async () => {
    await AsyncStorage.setItem("guestCheckout", "true");
    router.push("/checkout/address");
  };

  return (
    <View className="flex-1 justify-center items-center bg-primary p-6">
      <Text className="text-2xl text-white font-bold mb-6">
        Continuer vers le paiement
      </Text>
      <Pressable
        onPress={() => router.push("/auth/login")}
        className="bg-cta py-3 rounded-lg items-center shadow-md mt-2 px-4"
      >
        <Text className="text-primary font-bold text-lg">Se connecter</Text>
      </Pressable>

      <View className="h-4" />
      <Pressable
        onPress={continueAsGuest}
        className="bg-cta py-3 rounded-lg items-center shadow-md mt-2 px-4"
      >
        <Text className="text-primary font-bold text-lg">
          Continuer en tant qu'invité
        </Text>
      </Pressable>
    </View>
  );
}
