import { View, ScrollView, Text } from "react-native";
import React from "react";
import Footer from "../components/Footer";

export default function About() {
  return (
    <ScrollView className="flex-1 bg-primary">
      <View className="min-h-screen flex flex-col justify-between px-6 py-8">
        <Text className="text-2xl font-bold mb-4 text-white">
          À propos de Cyna
        </Text>

        <Text className="text-base mb-4 text-text">
          Cyna est une entreprise technologique spécialisée dans le
          développement de solutions numériques innovantes. Notre objectif est
          de rendre la technologie plus accessible, plus responsable et plus
          performante pour tous.
        </Text>

        <Text className="font-bold mb-1 text-white">Notre mission</Text>
        <Text className="mb-4 text-text">
          Offrir aux utilisateurs des outils modernes, sécurisés et intuitifs
          pour améliorer leur quotidien, qu’il s’agisse de services en ligne, de
          communication ou de gestion d’informations.
        </Text>

        <Text className="font-bold mb-1 text-white">Notre vision</Text>
        <Text className="mb-4 text-text">
          Chez Cyna, nous croyons en une technologie éthique, inclusive et
          durable. Nous plaçons l’humain au centre de chaque projet et
          valorisons l’innovation utile.
        </Text>

        <Text className="font-bold mb-1 text-white">Nos engagements</Text>
        <Text className="mb-4 text-text">
          - Respect de la vie privée et des données personnelles - Conformité
          aux normes et bonnes pratiques du web - Accessibilité et performance
          des applications - Support utilisateur réactif
        </Text>

        <Text className="font-bold mb-1 text-white">Une équipe passionnée</Text>
        <Text className="mb-4 text-text">
          Cyna regroupe des développeurs, designers et ingénieurs motivés par un
          objectif commun : créer un web plus humain, plus utile, et plus
          fiable.
        </Text>

        <Text className="mt-10 text-center text-sm text-text">
          © {new Date().getFullYear()} Cyna – Tous droits réservés.
        </Text>
      </View>
      <Footer />
    </ScrollView>
  );
}
