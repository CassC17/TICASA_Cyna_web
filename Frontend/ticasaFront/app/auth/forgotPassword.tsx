import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const handleForgotPassword = () => {
    let newErrors = { email: "" };

    if (!email.trim()) {
      newErrors.email = "L'email est requis.";
    }
    setErrors(newErrors);

    if (!newErrors.email) {
      console.log(`Email envoyé à ${email} !`);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center px-5">
        <View className="w-full max-w-md">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
            Mot de passe oublié
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

          <TouchableOpacity
            className="w-full h-12 mt-5 rounded-lg bg-blue-500 justify-center items-center shadow-md"
            onPress={handleForgotPassword}
          >
            <Text className="text-white text-lg font-bold">
              Réinitialiser mon mot de passe
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
