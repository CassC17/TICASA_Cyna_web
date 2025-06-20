import { useEffect, useState } from 'react';
import { View, Text, Platform, ScrollView, Button } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { getApiUrl } from '../../config';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      if (Platform.OS !== 'web') {
        router.replace('/');
        return;
      }

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        // Appel uniquement pour vérification admin
        const res = await fetch(`${getApiUrl()}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setIsAdmin(true);

          // → Ici, on mock les stats localement
          setStats({
            dailySales: [
              { buyDate: new Date(Date.now() - 6 * 86400000), _sum: { totalprice: 120 } },
              { buyDate: new Date(Date.now() - 5 * 86400000), _sum: { totalprice: 200 } },
              { buyDate: new Date(Date.now() - 4 * 86400000), _sum: { totalprice: 150 } },
              { buyDate: new Date(Date.now() - 3 * 86400000), _sum: { totalprice: 300 } },
              { buyDate: new Date(Date.now() - 2 * 86400000), _sum: { totalprice: 100 } },
              { buyDate: new Date(Date.now() - 1 * 86400000), _sum: { totalprice: 250 } },
              { buyDate: new Date(), _sum: { totalprice: 180 } },
            ],
            categorySales: [
              { product: { category: { name: "" } }, _sum: { price: 800 } },
              { product: { category: { name: "" } }, _sum: { price: 500 } },
              { product: { category: { name: "" } }, _sum: { price: 300 } },
            ],
          });
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Erreur lors de la vérification admin :', err);
        setIsAdmin(false);
      }
    };

    init();
  }, []);

  if (isAdmin === false) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-red-500 font-bold">Vous n'êtes pas administrateur</Text>
        <Button title="Retour à l'accueil" onPress={() => router.replace('/')} />
      </View>
    );
  }

  if (!stats || isAdmin === null) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text>Chargement des statistiques…</Text>
      </View>
    );
  }

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
