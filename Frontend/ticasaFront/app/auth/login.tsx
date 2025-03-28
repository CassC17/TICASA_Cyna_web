import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import useUserLogin from "../../hooks/useUserLogin";

export default function LoginScreen() {
  const { loginUser, loading, error, success } = useUserLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = () => {
    let newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "L'email est requis.";
    }

    if (!password.trim()) {
      newErrors.password = "Le mot de passe est requis.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      loginUser(email, password);
      router.push("/");
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center px-5">
        <View className="w-full max-w-md">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
            Connexion
          </Text>

          <Text className="mb-1 text-black text-base">Adresse mail</Text>
          <TextInput
            className={`w-full h-12 rounded-lg px-4 text-base bg-white shadow-sm ${
              errors.email
                ? "border-2 border-red-500"
                : "border border-gray-300"
            }`}
            value={email}
            onChangeText={setEmail}
          />
          {errors.email ? (
            <Text className="text-red-500 text-sm mt-1 mb-2">
              {errors.email}
            </Text>
          ) : null}

          <Text className="mt-4 mb-1 text-black text-base">Mot de passe</Text>
          <TextInput
            className={`w-full h-12 rounded-lg px-4 text-base bg-white shadow-sm ${
              errors.password
                ? "border-2 border-red-500"
                : "border border-gray-300"
            }`}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password ? (
            <Text className="text-red-500 text-sm mt-1 mb-2">
              {errors.password}
            </Text>
          ) : null}

          <Link href="auth/forgotPassword">
            <Text className="text-blue-500 underline text-right text-sm mt-2 mb-4">
              Mot de passe oublié ?
            </Text>
          </Link>

          <TouchableOpacity
            className="w-full h-12 mt-2 rounded-lg bg-blue-500 justify-center items-center shadow-md"
            onPress={handleLogin}
          >
            <Text className="text-white text-lg font-bold">Se connecter</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text>Vous n'avez pas de compte ? </Text>
            <Link href="auth/register">
              <Text className="text-blue-500 underline">Inscrivez-vous.</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
