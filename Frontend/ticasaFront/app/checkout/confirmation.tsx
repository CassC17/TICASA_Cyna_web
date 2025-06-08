import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function ConfirmationScreen() {
  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="text-2xl font-bold mb-4">🎉 Merci pour votre commande !</Text>
      <Text className="text-center mb-6">
        Un email de confirmation vous a été envoyé. Vous pouvez gérer vos abonnements dans votre compte.
      </Text>
      <Button title="Retour" onPress={() => router.push('/product')} />
    </View>
  );
}
