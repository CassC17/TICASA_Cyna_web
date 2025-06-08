import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginOrGuest() {
  const continueAsGuest = async () => {
    await AsyncStorage.setItem('guestCheckout', 'true');
    router.push('/checkout/address');
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-2xl font-bold mb-6">Continuer vers le paiement</Text>
      <Button title="Se connecter" onPress={() => router.push('/auth/login')} />
      <View className="h-4" />
      <Button title="Continuer en tant qu'invité" onPress={continueAsGuest} />
    </View>
  );
}
