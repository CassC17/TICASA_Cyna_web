import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import useUserRegister from "../../hooks/useUserRegister";

export default function RegisterScreen() {
  const { registerUser, loading, error, success } = useUserRegister();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!firstName.trim()) newErrors.firstName = "Le prénom est requis.";
    if (!lastName.trim()) newErrors.lastName = "Le nom est requis.";
    if (!email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'email invalide.";
    }

    switch (true) {
      case !password.trim():
        newErrors.password = "Le mot de passe est requis.";
        break;
      case password.length < 8:
        newErrors.password = "Minimum 8 caractères.";
        break;
      case !/[A-Z]/.test(password):
        newErrors.password = "Une majuscule requise.";
        break;
      case !/[a-z]/.test(password):
        newErrors.password = "Une minuscule requise.";
        break;
      case !/\d/.test(password):
        newErrors.password = "Un chiffre requis.";
        break;
      case !/[!@#$%^&*(),.?":{}|<>]/.test(password):
        newErrors.password = "Un caractère spécial requis.";
        break;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirmation requise.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((e) => e === "")) {
      registerUser(firstName, lastName, email, password);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center px-5">
        <View className="w-full max-w-md">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
            Inscription
          </Text>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-base text-black mb-1">Prénom</Text>
              <TextInput
                className={`h-12 rounded-lg px-4 bg-white shadow-sm text-base ${
                  errors.firstName
                    ? "border-2 border-red-500"
                    : "border border-gray-300"
                }`}
                value={firstName}
                onChangeText={setFirstName}
              />
              {errors.firstName ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.firstName}
                </Text>
              ) : null}
            </View>

            <View className="flex-1">
              <Text className="text-base text-black mb-1">Nom</Text>
              <TextInput
                className={`h-12 rounded-lg px-4 bg-white shadow-sm text-base ${
                  errors.lastName
                    ? "border-2 border-red-500"
                    : "border border-gray-300"
                }`}
                value={lastName}
                onChangeText={setLastName}
              />
              {errors.lastName ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.lastName}
                </Text>
              ) : null}
            </View>
          </View>

          <Text className="text-base text-black mt-4 mb-1">Adresse mail</Text>
          <TextInput
            className={`h-12 rounded-lg px-4 bg-white shadow-sm text-base ${
              errors.email
                ? "border-2 border-red-500"
                : "border border-gray-300"
            }`}
            value={email}
            onChangeText={setEmail}
          />
          {errors.email ? (
            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
          ) : null}

          <Text className="text-base text-black mt-4 mb-1">Mot de passe</Text>
          <TextInput
            className={`h-12 rounded-lg px-4 bg-white shadow-sm text-base ${
              errors.password
                ? "border-2 border-red-500"
                : "border border-gray-300"
            }`}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password ? (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          ) : null}

          <Text className="text-base text-black mt-4 mb-1">
            Confirmer le mot de passe
          </Text>
          <TextInput
            className={`h-12 rounded-lg px-4 bg-white shadow-sm text-base ${
              errors.confirmPassword
                ? "border-2 border-red-500"
                : "border border-gray-300"
            }`}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword ? (
            <Text className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </Text>
          ) : null}

          <TouchableOpacity
            className="h-12 w-full mt-6 rounded-lg bg-blue-500 justify-center items-center shadow-md"
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white text-lg font-bold">
              {loading ? "Chargement..." : "S'inscrire"}
            </Text>
          </TouchableOpacity>

          {error && <Text className="text-red-500 text-sm mt-4">{error}</Text>}
          {success && (
            <Text className="text-green-600 text-sm mt-4">
              Inscription réussie !
            </Text>
          )}

          <View className="flex-row justify-center mt-6">
            <Text>Vous avez déjà un compte ? </Text>
            <Link href="auth/login">
              <Text className="text-blue-500 underline">Connectez-vous.</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
