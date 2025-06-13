import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiUrl } from "../../config";

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notAuthenticated, setNotAuthenticated] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setNotAuthenticated(true);
          return;
        }

        const res = await fetch(`${getApiUrl()}/orders/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setNotAuthenticated(true);
            return;
          }
          throw new Error(`Erreur serveur : ${res.status}`);
        }

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Erreur récupération des commandes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (notAuthenticated) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-xl font-semibold text-red-600 mb-2">
          Vous n'êtes pas connecté
        </Text>
        <Text className="text-gray-600 text-center">
          Veuillez vous connecter pour consulter votre historique de commandes.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">Mes commandes</Text>

      {orders.length === 0 ? (
        <Text className="text-gray-500 italic">Aucune commande trouvée</Text>
      ) : (
        orders.map((order) => (
          <View
            key={order.id}
            className="mb-4 bg-white rounded-lg p-4 shadow"
          >
            <Text className="font-semibold">Commande</Text>
            <Text>Date : {new Date(order.buyDate).toLocaleDateString()}</Text>
            <Text>Total : {order.totalprice.toFixed(2)} €</Text>

            {order.orderItems?.map((item: any) => (
              <Text key={item.id}>
                - {item.product?.name ?? "Produit inconnu"} x {item.productQty}
              </Text>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
}
