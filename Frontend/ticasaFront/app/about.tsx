import { ScrollView, Text } from "react-native";
import React from "react";

export default function About() {
    return (
        <ScrollView className="flex-1 bg-white px-6 py-8">
        <Text className="text-2xl font-bold mb-4 text-blue-600">À propos de Cyna</Text>

        <Text className="text-base mb-4">
            Cyna est une entreprise technologique spécialisée dans le développement de solutions
            numériques innovantes. Notre objectif est de rendre la technologie plus accessible, plus
            responsable et plus performante pour tous.
        </Text>

        <Text className="font-bold mb-1">Notre mission</Text>
        <Text className="mb-4">
            Offrir aux utilisateurs des outils modernes, sécurisés et intuitifs pour améliorer leur
            quotidien, qu’il s’agisse de services en ligne, de communication ou de gestion
            d’informations.
        </Text>

        <Text className="font-bold mb-1">Notre vision</Text>
        <Text className="mb-4">
            Chez Cyna, nous croyons en une technologie éthique, inclusive et durable. Nous plaçons
            l’humain au centre de chaque projet et valorisons l’innovation utile.
        </Text>

        <Text className="font-bold mb-1">Nos engagements</Text>
        <Text className="mb-4">
            - Respect de la vie privée et des données personnelles  
            - Conformité aux normes et bonnes pratiques du web  
            - Accessibilité et performance des applications  
            - Support utilisateur réactif
        </Text>

        <Text className="font-bold mb-1">Une équipe passionnée</Text>
        <Text className="mb-4">
            Cyna regroupe des développeurs, designers et ingénieurs motivés par un objectif commun :
            créer un web plus humain, plus utile, et plus fiable.
        </Text>

        <Text className="mt-10 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Cyna – Tous droits réservés.
        </Text>
        </ScrollView>
    );
}