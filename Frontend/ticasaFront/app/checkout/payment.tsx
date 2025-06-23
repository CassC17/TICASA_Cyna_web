import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../../contexts/CartContext";
import { createStripeSession } from "../../utils/stripe";
import { WebView } from "react-native-webview";
import { getApiUrl } from "../../config";

export default function PaymentScreen() {
  const { cartItems } = useCart();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const launchCheckout = async () => {
      try {
        const guest = await AsyncStorage.getItem("guestCheckout");
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const email = guest
          ? "invite@example.com"
          : storedEmail || "utilisateur@connecte.com";

        const token = await AsyncStorage.getItem("token");

        await fetch(`${getApiUrl()}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cartItems }),
        });

        const url = await createStripeSession(cartItems, email);
        if (Platform.OS === "web") {
          window.location.href = url;
        } else {
          setCheckoutUrl(url);
        }
      } catch (error) {
        console.error("Erreur Stripe :", error);
      } finally {
        setLoading(false);
      }
    };

    launchCheckout();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" />
        <Text className="text-2xl text-white font-semibold mb-4">
          Chargement de Stripe...
        </Text>
      </View>
    );
  }

  if (checkoutUrl && Platform.OS !== "web") {
    return <WebView source={{ uri: checkoutUrl }} style={{ flex: 1 }} />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text className="text-2xl text-white font-semibold mb-4">
        Chargement...
      </Text>
    </View>
  );
}
