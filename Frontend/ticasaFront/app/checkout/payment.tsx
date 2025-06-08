import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../../contexts/CartContext';
import { createStripeSession } from '../../utils/stripe';
import { WebView } from 'react-native-webview';

export default function PaymentScreen() {
  const { cartItems } = useCart();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const launchCheckout = async () => {
      try {
        const guest = await AsyncStorage.getItem('guestCheckout');
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const email = guest ? 'invite@example.com' : storedEmail || 'utilisateur@connecte.com';

        const url = await createStripeSession(cartItems, email);
        if (Platform.OS === 'web') {
          window.location.href = url;
        } else {
          setCheckoutUrl(url);
        }
      } catch (error) {
        console.error('Erreur Stripe :', error);
      } finally {
        setLoading(false);
      }
    };

    launchCheckout();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text>Chargement de Stripe...</Text>
      </View>
    );
  }

  if (checkoutUrl && Platform.OS !== 'web') {
    return <WebView source={{ uri: checkoutUrl }} style={{ flex: 1 }} />;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Chargement...</Text>
    </View>
  );
}
