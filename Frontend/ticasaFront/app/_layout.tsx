import { Stack } from "expo-router";
import { useEffect } from "react";
import ErrorHandler from "./providers/ErrorHandler";
import errorTracking from "./services/errorTraking";
import "../global.css";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../contexts/CartContext";
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


LogBox.ignoreAllLogs();

export default function RootLayout() {
  useEffect(() => {
    errorTracking();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorHandler>
        <CartProvider>
          <Header />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="auth/login" options={{ title: "Login" }} />
            <Stack.Screen name="auth/register" options={{ title: "Register" }} />
            <Stack.Screen name="auth/forgotPassword" options={{ title: "Mot de passe oublié" }} />
            <Stack.Screen name="product" options={{ title: "Product Details" }} />
          </Stack>
          <CartDrawer />
        </CartProvider>
      </ErrorHandler>
    </GestureHandlerRootView>
  );
}
