import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ActivityIndicator } from 'react-native';

export default function CheckoutEntry() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.replace('/checkout/address');
      } else {
        router.replace('/checkout/login-or-guest');
      }
    };
    checkAuth();
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
      <Text>Chargement...</Text>
    </View>
  );
}
