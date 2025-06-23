import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../config';

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') router.replace('/');
    AsyncStorage.getItem('token').then(async token => {
      const res = await fetch(`${getApiUrl()}/products/list`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setForm(data.find((p:any) => p.id.toString() === id));
    });
  }, []);

  const save = async () => {
    const token = await AsyncStorage.getItem('token');
    await fetch(`${getApiUrl()}/products/modify/${id}`, {
      method: 'PUT', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify({
        name: form.name,
        price: parseFloat(form.price),
        fournisseur: form.fournisseur,
        description: form.description,
        image: form.image,
        categoryId: form.categoryId
      }),
    });
    router.push('/admin/products');
  };

  if (!form) return <Text>Chargement...</Text>;

  return (
    <ScrollView className="p-8">
      <Text className="text-2xl mb-4">Modifier produit #{id}</Text>
      {['name','price','fournisseur','description','image'].map(f => (
        <TextInput
          key={f} className="border p-2 mb-3" value={form[f].toString()} onChangeText={v => setForm((prev:any) => ({ ...prev, [f]: v }))}
        />
      ))}
      <Text>Category: {form.categoryId}</Text>
      <Button title="Sauvegarder" onPress={save} />
    </ScrollView>
  );
}
