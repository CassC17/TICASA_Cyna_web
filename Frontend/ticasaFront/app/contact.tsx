import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Footer from "../components/Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    console.log("Formulaire soumis :", { name, email, message });

    setName("");
    setEmail("");
    setMessage("");

    Alert.alert(
      "Message envoyé",
      "Nous vous répondrons dans les plus brefs délais."
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="min-h-screen flex flex-col justify-between px-6 py-8">
          <Text className="text-2xl font-bold mb-6 text-blue-600">
            Contactez-nous
          </Text>

          <Text className="mb-1 font-semibold">Nom</Text>
          <TextInput
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={name}
            onChangeText={setName}
            placeholder="Votre nom"
          />

          <Text className="mb-1 font-semibold">Adresse e-mail</Text>
          <TextInput
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={email}
            onChangeText={setEmail}
            placeholder="votre@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text className="mb-1 font-semibold">Message</Text>
          <TextInput
            className="border border-gray-300 rounded-md px-4 py-2 mb-6"
            value={message}
            onChangeText={setMessage}
            placeholder="Écrivez votre message ici..."
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-600 rounded-full py-3 px-6 self-start"
          >
            <Text className="text-white font-bold text-center">Envoyer</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
