import { useEffect, useState } from 'react';
import { View, Text, Platform, ScrollView, Button } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { getApiUrl } from '../../config';


export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') router.replace('/');
    AsyncStorage.getItem('token').then(token => {
      fetch(`${getApiUrl()}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(setStats);
    });
  }, []);

  if (!stats) return <Text>Chargement des statistiques...</Text>;

  const { dailySales, categorySales } = stats;

  const lineData = {
    labels: dailySales.map((d: any) =>
      new Date(d.buyDate).toLocaleDateString()
    ),
    datasets: [
      {
        data: dailySales.map((d: any) => d._sum.totalprice || 0),
      },
    ],
  };

  const barData = {
    labels: categorySales.map((c: any) => c.product.category.name),
    datasets: [
      {
        data: categorySales.map((c: any) => c._sum.price || 0),
      },
    ],
  };

  const pieData = categorySales.map((c: any, i: number) => ({
    name: c.product.category.name,
    population: c._sum.price || 0,
    color: ['#f00', '#0f0', '#00f', '#ffa500', '#800080'][i % 5],
    legendFontColor: '#000',
    legendFontSize: 12,
  }));

  return (
    <ScrollView className="p-8">
      <Text className="text-3xl font-bold mb-6">Tableau de bord</Text>

      <Text className="mb-2">Ventes des 7 derniers jours (chiffre d'affaires)</Text>
      <LineChart
        data={lineData}
        width={800}
        height={220}
        yAxisLabel="€"
        chartConfig={chartStyle}
        bezier
      />

      <Text className="mt-8 mb-2">Panier moyen par catégorie</Text>
      <BarChart
        data={barData}
        width={800}
        height={220}
        yAxisLabel="€"
        yAxisSuffix=""
        chartConfig={chartStyle}
      />

      <Text className="mt-8 mb-2">Ventes par catégorie (camembert)</Text>
      <PieChart
        data={pieData}
        width={800}
        height={220}
        chartConfig={chartStyle}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <View className="mt-8 border-t border-gray-300 pt-6">
  <Text className="text-xl font-semibold mb-4">Administration</Text>
  <Button title="→ Gérer les produits SaaS" onPress={() => router.push('/admin/products')} />
  <View className="mt-2" />
  <Button title="→ Créer un produit" onPress={() => router.push('/admin/products/create')} />
</View>
    </ScrollView>
  );
}

const chartStyle = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0,0,255,${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '1',
    stroke: '#1e90ff',
  },
};


