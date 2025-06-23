import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AddressScreen() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    await AsyncStorage.setItem("billingAddress", JSON.stringify(form));
    router.push("/checkout/payment");
  };

  return (
    <ScrollView className="flex-1 bg-primary px-5">
      <View className="w-full self-center py-10">
        <Text className="text-3xl font-bold text-center text-white mb-8 mt-6">
          Adresse de facturation
        </Text>

        <View className="flex-row flex-wrap justify-between">
          <View className="w-full md:w-[48%] mb-4 space-y-1">
            <Text className="text-white mb-2">Prénom</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.firstName}
              onChangeText={(v) => handleChange("firstName", v)}
              placeholder="Jean"
              placeholderTextColor="#ccc"
            />
          </View>

          <View className="w-full md:w-[48%] mb-4 space-y-1">
            <Text className="text-white mb-2">Nom</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.lastName}
              onChangeText={(v) => handleChange("lastName", v)}
              placeholder="Dupont"
              placeholderTextColor="#ccc"
            />
          </View>

          <View className="w-full md:w-[48%] mb-4 space-y-1">
            <Text className="text-white mb-2">Adresse ligne 1</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.address1}
              onChangeText={(v) => handleChange("address1", v)}
              placeholder="Rue, numéro"
              placeholderTextColor="#ccc"
            />
          </View>

          <View className="w-full md:w-[48%] mb-4 space-y-1">
            <Text className="text-white mb-2">Adresse ligne 2</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.address2}
              onChangeText={(v) => handleChange("address2", v)}
              placeholder="Appartement, étage..."
              placeholderTextColor="#ccc"
            />
          </View>

          <View className="w-full md:w-[48%] mb-4 space-y-1">
            <Text className="text-white mb-2">Région</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.region}
              onChangeText={(v) => handleChange("region", v)}
              placeholder="Île-de-France"
              placeholderTextColor="#ccc"
            />
          </View>

          <View className="w-full md:w-[48%] mb-4 space-y-1">
            <Text className="text-white mb-2">Ville</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.city}
              onChangeText={(v) => handleChange("city", v)}
              placeholder="Paris"
              placeholderTextColor="#ccc"
            />
          </View>

          <View className="w-full md:w-[48%] mb-4 space-y-1">
            <Text className="text-white mb-2">Code postal</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.postalCode}
              onChangeText={(v) => handleChange("postalCode", v)}
              placeholder="75000"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
            />
          </View>

          <View className="w-full md:w-[48%] mb-4 space-y-1">
            <Text className="text-white mb-2">Pays</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.country}
              onChangeText={(v) => handleChange("country", v)}
              placeholder="France"
              placeholderTextColor="#ccc"
            />
          </View>

          <View className="w-full mb-6 space-y-1">
            <Text className="text-white mb-2">Téléphone</Text>
            <TextInput
              className="h-12 px-4 bg-primary-dark rounded-lg border shadow-sm text-text border-gray-300"
              value={form.phone}
              onChangeText={(v) => handleChange("phone", v)}
              placeholder="+33 6 12 34 56 78"
              placeholderTextColor="#ccc"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <Pressable
          onPress={handleNext}
          className="bg-cta py-3 rounded-lg items-center shadow-md"
        >
          <Text className="text-primary font-bold text-lg">
            Continuer vers le paiement
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
