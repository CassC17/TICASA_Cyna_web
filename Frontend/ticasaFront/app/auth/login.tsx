import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserLogin from "../../hooks/useUserLogin";

export default function LoginScreen() {
  const { loginUser, loading, error, success } = useUserLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = () => {
    const newErrors = {
      email: email.trim() ? "" : "L'email est requis.",
      password: password.trim() ? "" : "Le mot de passe est requis.",
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      loginUser(email, password);
      AsyncStorage.setItem("userEmail", email);
      AsyncStorage.removeItem("guestCheckout");
      router.push("/");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-primary px-5 w-full ">
      <Text className="text-3xl font-bold text-white mb-8">Connexion</Text>

      <View className="w-full max-w-md">
        {/* Email */}
        <View className="mb-4">
          <Text className="text-base text-white mb-1">Adresse mail</Text>
          <TextInput
            className={`w-full h-12 bg-primary-dark border px-4 rounded-lg shadow-sm text-text ${
              errors.email ? "border-red-500 border-2" : "border-gray-300"
            }`}
            value={email}
            onChangeText={setEmail}
            placeholder="Votre adresse mail"
            placeholderTextColor="#E0E0E0"
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
          )}
        </View>

        {/* Mot de passe */}
        <View className="mb-2">
          <Text className="text-base text-white mb-1">Mot de passe</Text>
          <TextInput
            className={`w-full h-12 bg-primary-dark border px-4 rounded-lg shadow-sm  text-text ${
              errors.password ? "border-red-500 border-2" : "border-gray-300"
            }`}
            value={password}
            onChangeText={setPassword}
            placeholder="Votre mot de passe"
            placeholderTextColor="#E0E0E0"
            secureTextEntry
          />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          )}
        </View>

        {/* Mot de passe oublié */}
        <Link href="auth/forgotPassword">
          <Text className="text-blue-soft underline text-right mb-4">
            Mot de passe oublié ?
          </Text>
        </Link>

        {/* Bouton de connexion */}
        <Pressable
          onPress={handleLogin}
          className="bg-cta py-3 rounded-lg items-center shadow-md mt-2"
        >
          <Text className="text-primary font-bold text-lg">Se connecter</Text>
        </Pressable>

        {/* Lien d'inscription */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-text mr-1">Vous n'avez pas de compte ?</Text>
          <Link href="auth/register">
            <Text className="text-blue-soft underline">Inscrivez-vous.</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
