import { Linking } from 'react-native';
import { CartItem } from '../types/CartItem';

export const createStripeSession = async (cartItems: CartItem[], userEmail: string) => {
  const isSubscription = cartItems.some(item => item.isSubscription === true);

  const response = await fetch('http://localhost:3000/payment/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems, userEmail, isSubscription }),
  });

  const data = await response.json();
  if (data.url) {
    Linking.openURL(data.url);
  } else {
    console.error('Erreur : aucune URL Stripe retournée');
  }
};
