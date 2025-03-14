import { Stack } from "expo-router";
import { useEffect } from "react";
import ErrorHandler from "./providers/ErrorHandler";
import errorTracking from "./services/errorTraking";
import "../global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout() {
  useEffect(() => {
    errorTracking();
  }, []);

  return (
    <ErrorHandler>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="auth/login" options={{ title: "Login" }} />
        <Stack.Screen name="auth/register" options={{ title: "Register" }} />
        <Stack.Screen
          name="auth/forgotPassword"
          options={{ title: "Mot de passe oublié" }}
        />
        <Stack.Screen name="product" options={{ title: "Product Details" }} />
      </Stack>
      <Footer />
    </ErrorHandler>
  );
}
