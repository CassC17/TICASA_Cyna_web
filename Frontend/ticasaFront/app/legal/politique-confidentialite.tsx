import { View, ScrollView, Text } from "react-native";
import React from "react";
import Footer from "../../components/Footer";

export default function PolitiqueConfidentialite() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="min-h-screen flex flex-col justify-between px-6 py-8">
        <Text className="text-2xl font-bold mb-4 text-blue-600">
          Politique de confidentialité
        </Text>

        <Text className="text-base mb-4">
          La présente politique de confidentialité a pour but d’informer les
          utilisateurs du site Cyna sur la manière dont leurs données
          personnelles sont collectées, utilisées et protégées.
        </Text>

        <Text className="font-bold mb-1">
          1. Collecte des données personnelles
        </Text>
        <Text className="mb-4">
          Les données personnelles collectées peuvent inclure : nom, prénom,
          adresse e-mail, numéro de téléphone, informations de paiement, adresse
          IP, données de navigation, etc.
        </Text>

        <Text className="font-bold mb-1">2. Finalité de la collecte</Text>
        <Text className="mb-4">
          Ces données sont utilisées pour le traitement des commandes, l’envoi
          de communications, la gestion des comptes utilisateurs, l’amélioration
          des services, et le respect des obligations légales.
        </Text>

        <Text className="font-bold mb-1">3. Stockage et sécurité</Text>
        <Text className="mb-4">
          Les données sont stockées de manière sécurisée sur des serveurs
          protégés. Nous mettons en place toutes les mesures nécessaires pour
          garantir leur confidentialité (chiffrement, pare-feu,
          authentification, etc.).
        </Text>

        <Text className="font-bold mb-1">4. Partage des données</Text>
        <Text className="mb-4">
          Aucune donnée personnelle n’est vendue. Elles peuvent être partagées
          avec des partenaires techniques (ex : services de paiement,
          hébergement), uniquement si cela est nécessaire au fonctionnement du
          service.
        </Text>

        <Text className="font-bold mb-1">5. Vos droits</Text>
        <Text className="mb-4">
          Conformément au RGPD, vous disposez des droits suivants : accès,
          rectification, suppression, opposition, et portabilité. Vous pouvez
          exercer ces droits en nous contactant à l’adresse :{" "}
          <Text className="underline">privacy@cyna.com</Text>
        </Text>

        <Text className="font-bold mb-1">6. Cookies</Text>
        <Text className="mb-4">
          Le site peut utiliser des cookies pour améliorer l’expérience
          utilisateur et analyser le trafic. Vous pouvez les gérer via les
          paramètres de votre navigateur.
        </Text>

        <Text className="font-bold mb-1">7. Modification de la politique</Text>
        <Text className="mb-4">
          Cyna se réserve le droit de modifier cette politique à tout moment.
          Les utilisateurs seront informés de toute mise à jour via le site.
        </Text>

        <Text className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Cyna – Tous droits réservés.
        </Text>
      </View>
      <Footer />
    </ScrollView>
  );
}
