import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const handleForgotPassword = () => {
    const newErrors = { email: "" };

    if (!email.trim()) {
      newErrors.email = "L'email est requis.";
    }

    setErrors(newErrors);

    if (!newErrors.email) {
      console.log(`Email envoyé à ${email} !`);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-5 bg-primary w-full">
      <Text className="text-3xl font-bold text-white mb-8">
        Mot de passe oublié
      </Text>

      <View className="w-full max-w-md">
        <View>
          <Text className="text-base text-white mb-2">Adresse mail</Text>
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

        <Pressable
          onPress={handleForgotPassword}
          className="w-full bg-cta mt-6 py-3 rounded-lg items-center shadow-md"
        >
          <Text className="text-primary font-bold text-lg">
            Réinitialiser mon mot de passe
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
