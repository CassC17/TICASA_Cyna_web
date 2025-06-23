import { Platform } from 'react-native';
import { CartItem } from '../types/CartItem';

export const createStripeSession = async (
  cartItems: CartItem[],
  userEmail: string
): Promise<string> => {
  const isSubscription = cartItems.some(item => item.isSubscription === true);

  const response = await fetch(
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/payment/create-checkout-session'
      : 'http://localhost:3000/payment/create-checkout-session',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems, userEmail, isSubscription }),
    }
  );

  const data = await response.json();

  if (!data.url) {
    throw new Error('Aucune URL Stripe retournée');
  }

  return data.url;
};
