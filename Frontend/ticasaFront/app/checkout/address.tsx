import { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function AddressScreen() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    await AsyncStorage.setItem('billingAddress', JSON.stringify(form));
    router.push('/checkout/payment');
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Adresse de facturation</Text>

      {['firstName','lastName','address1','address2','city','region','postalCode','country','phone'].map(field => (
        <TextInput
          key={field}
          className="border border-gray-300 p-3 mb-3 rounded"
          placeholder={field}
          value={form[field as keyof typeof form]}
          onChangeText={(text) => handleChange(field, text)}
        />
      ))}

      <Button title="Continuer vers le paiement" onPress={handleNext} />
    </ScrollView>
  );
}
