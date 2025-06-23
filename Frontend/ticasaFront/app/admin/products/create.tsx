import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    fournisseur: '',
    description: '',
    image: '',
    categoryId: ''
  });
  const [categories, setCats] = useState<any[]>([]);

  useEffect(() => {
    if (Platform.OS !== 'web') router.replace('/');
    AsyncStorage.getItem('token').then(async token => {
      const res = await fetch(`${getApiUrl()}/categories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCats(await res.json());
    });
  }, []);

  const submit = async () => {
    const token = await AsyncStorage.getItem('token');
    const payload = {
      ...form,
      price: parseFloat(form.price),
      categoryId: parseInt(form.categoryId),
      image: form.image || 'placeholder.png', // fallback
      activePromoId: null
    };

    const res = await fetch(`${getApiUrl()}/products/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Erreur de création :", data);
      Alert.alert("Erreur", data?.errors?.map((e: any) => `${e.field} : ${e.errors.join(', ')}`).join('\n') || "Erreur inconnue");
      return;
    }

    router.push('/admin/products');
  };

  return (
    <ScrollView className="p-8">
      <Text className="text-2xl mb-4">Créer un produit SaaS</Text>

      {['name', 'price', 'fournisseur', 'description', 'image'].map((f) => (
        <TextInput
          key={f}
          className="border p-2 mb-3"
          placeholder={f}
          value={(form as any)[f]}
          onChangeText={(v) => setForm((prev) => ({ ...prev, [f]: v }))}
        />
      ))}

      <Text className="font-semibold my-2">Catégorie</Text>
      {categories.map((c) => (
        <TouchableOpacity
          key={c.id}
          onPress={() => setForm((prev) => ({ ...prev, categoryId: c.id.toString() }))}
        >
          <Text className={form.categoryId === c.id.toString() ? 'text-blue-500 font-bold' : ''}>
            {c.name}
          </Text>
        </TouchableOpacity>
      ))}

      <View className="mt-4">
        <Button title="Créer" onPress={submit} />
      </View>
    </ScrollView>
  );
}
