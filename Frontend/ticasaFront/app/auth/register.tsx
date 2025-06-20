import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
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
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!firstName.trim()) newErrors.firstName = "Le prénom est requis.";
    if (!lastName.trim()) newErrors.lastName = "Le nom est requis.";
    if (!email.trim()) newErrors.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Format d'email invalide.";

    if (!password.trim()) newErrors.password = "Le mot de passe est requis.";
    else if (password.length < 8)
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères.";
    else if (!/[A-Z]/.test(password))
      newErrors.password =
        "Le mot de passe doit contenir au moins une majuscule.";
    else if (!/[a-z]/.test(password))
      newErrors.password =
        "Le mot de passe doit contenir au moins une minuscule.";
    else if (!/\d/.test(password))
      newErrors.password = "Le mot de passe doit contenir au moins un chiffre.";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      newErrors.password =
        "Le mot de passe doit contenir au moins un caractère spécial.";

    if (!confirmPassword.trim())
      newErrors.confirmPassword = "La confirmation est requise.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";

    setErrors(newErrors);

    if (Object.values(newErrors).every((e) => e === "")) {
      registerUser(firstName, lastName, email, password);
    }
  };

  return (
    <ScrollView className="flex-1 bg-primary bg-p px-5">
      <View className="w-full max-w-md self-center py-10">
        <Text className="text-3xl font-bold text-center text-white mb-8 mt-6">
          Inscription
        </Text>

        <View className="flex-row justify-between space-x-4 mb-4">
          <View className="flex-1 space-y-1">
            <Text className="text-white mb-2">Prénom</Text>
            <TextInput
              className={`h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text ${
                errors.firstName ? "border-red-500 border-2" : "border-gray-300"
              }`}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Jean"
            />
            {errors.firstName && (
              <Text className="text-red-500 text-sm">{errors.firstName}</Text>
            )}
          </View>

          <View className="flex-1 space-y-1">
            <Text className="text-white mb-2">Nom</Text>
            <TextInput
              className={`h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text ${
                errors.lastName ? "border-red-500 border-2" : "border-gray-300"
              }`}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Dupont"
            />
            {errors.lastName && (
              <Text className="text-red-500 text-sm">{errors.lastName}</Text>
            )}
          </View>
        </View>

        <View className="mb-4 space-y-1">
          <Text className="text-white mb-2">Adresse mail</Text>
          <TextInput
            className={`h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text ${
              errors.email ? "border-red-500 border-2" : "border-gray-300"
            }`}
            value={email}
            onChangeText={setEmail}
            placeholder="exemple@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email}</Text>
          )}
        </View>

        <View className="mb-4 space-y-1">
          <Text className="text-white mb-2">Mot de passe</Text>
          <TextInput
            className={`h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text ${
              errors.password ? "border-red-500 border-2" : "border-gray-300"
            }`}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="********"
          />
          {errors.password && (
            <Text className="text-red-500 text-sm">{errors.password}</Text>
          )}
        </View>

        <View className="mb-4 space-y-1">
          <Text className="text-white mb-2">Confirmer le mot de passe</Text>
          <TextInput
            className={`h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text ${
              errors.confirmPassword
                ? "border-red-500 border-2"
                : "border-gray-300"
            }`}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="********"
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        <Pressable
          className="bg-cta py-3 rounded-lg items-center shadow-md mt-4"
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-primary font-bold text-base">
            {loading ? "Chargement..." : "S'inscrire"}
          </Text>
        </Pressable>

        {error && <Text className="text-red-500 mt-4">{error}</Text>}
        {success && (
          <Text className="text-green-600 mt-4">Inscription réussie !</Text>
        )}

        <View className="flex-row justify-center mt-6">
          <Text className="text-text mb-2">Vous avez déjà un compte ? </Text>
          <Link href="auth/login">
            <Text className="text-blue-soft underline">Connectez-vous.</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
