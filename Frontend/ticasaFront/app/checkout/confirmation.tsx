import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function ConfirmationScreen() {
  return (
    <View className="flex-1 justify-center items-center px-4 bg-primary">
      <Text className="text-2xl text-white font-bold mb-4">
        🎉 Merci pour votre commande !
      </Text>
      <Text className="text-center text-text mb-6">
        Un email de confirmation vous a été envoyé. Vous pouvez gérer vos
        abonnements dans votre compte.
      </Text>
      <Pressable
        className="bg-cta p-4 rounded-xl items-center"
        onPress={() => router.push("/product")}
      >
        <Text className="text-primary text-base font-semibold text-center">
          Retour
        </Text>
      </Pressable>
    </View>
  );
}
