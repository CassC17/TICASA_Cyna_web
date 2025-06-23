import { useEffect, useState } from 'react';
import { View, Text, FlatList, Platform, Button, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../config';


export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if (Platform.OS !== 'web') router.replace('/');
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${getApiUrl()}/products/list`, { headers: { Authorization: `Bearer ${token}` } });
    setProducts(await res.json());
  };

  const toggle = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const deleteGroup = async () => {
    const token = await AsyncStorage.getItem('token');
    await Promise.all(selected.map(id =>
      fetch(`${getApiUrl()}/products/delete/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    ));
    fetchProducts();
    setSelected([]);
  };

  return (
    <View className="p-8">
      <Text className="text-2xl mb-4">Produits SaaS</Text>
      {selected.length > 0 && <Button title={`Supprimer (${selected.length})`} onPress={deleteGroup} />}
      <Button title="Créer" onPress={() => router.push('/admin/products/create')} />
      <FlatList
        data={products}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row justify-between p-2 border-b" onPress={() => router.push(`/admin/products/${item.id}`)}>
            <Text>{item.name}</Text><Text>{item.price}€</Text>
            <TouchableOpacity onPress={() => toggle(item.id)}>
              <Text className={selected.includes(item.id) ? 'text-red-500' : 'text-blue-500'}>
                {selected.includes(item.id) ? '✓' : 'Sélectionner'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

type Product = { id: number; name: string; price: number; fournisseur: string; };
