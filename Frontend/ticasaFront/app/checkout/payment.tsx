import { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { View, Text, ActivityIndicator } from 'react-native';
import { createStripeSession } from '../../utils/stripe';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaymentScreen() {
  const { cartItems } = useCart();

useEffect(() => {
  const launchCheckout = async () => {
    const guest = await AsyncStorage.getItem('guestCheckout');
    const storedEmail = await AsyncStorage.getItem('userEmail');
    const email = guest ? 'invite@example.com' : storedEmail || 'utilisateur@connecte.com';

    createStripeSession(cartItems, email);
  };

  launchCheckout();
}, []);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
      <Text>Redirection vers Stripe...</Text>
    </View>
  );
}
