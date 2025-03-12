import { Stack } from "expo-router";
import { useEffect } from "react";
import ErrorHandler from "./providers/ErrorHandler"
import errorTracking from "./services/errorTraking";
import "../global.css";

export default function RootLayout() {
  // ✅ Initialize global services when app starts
  useEffect(() => {
    errorTracking(); // Initialize error tracking
  }, []);

  return (
    <ErrorHandler>
        <Stack
          screenOptions={{
            headerShown: false, // Custom headers are used instead
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="auth" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
          <Stack.Screen name="product" options={{ title: "Product Details" }} />
        </Stack>
    </ErrorHandler>
  );
}
