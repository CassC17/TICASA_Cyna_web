// app/checkout/StripeCheckoutScreen.tsx
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function StripeCheckoutScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const router = useRouter();

  if (!url) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: decodeURIComponent(url) }}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes("success")) {
          router.replace("/checkout/success");
        } else if (navState.url.includes("cancel")) {
          router.replace("/checkout/cancel");
        }
      }}
    />
  );
}
