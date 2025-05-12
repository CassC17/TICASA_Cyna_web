import { ScrollView, Text, View } from "react-native";
import React from "react";

export default function CGU() {
  return (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      <Text className="text-2xl font-bold mb-4 text-blue-600">Conditions Générales d'Utilisation (CGU)</Text>

      <Text className="text-base mb-4">
        Les présentes Conditions Générales d’Utilisation (ci-après « CGU ») ont pour objet l’encadrement juridique de l’accès et de l’utilisation du site web de la société Cyna.
      </Text>

      <Text className="font-bold mb-1">1. Acceptation des CGU</Text>
      <Text className="mb-4">
        En accédant au site ou en l'utilisant, vous acceptez sans réserve les présentes CGU. Si vous êtes en désaccord, veuillez ne pas utiliser le site.
      </Text>

      <Text className="font-bold mb-1">2. Accès au site</Text>
      <Text className="mb-4">
        Le site est accessible gratuitement à tout utilisateur disposant d’un accès internet. Tous les coûts afférents à l’accès au service (matériel, logiciels, connexion internet) sont à la charge de l’utilisateur.
      </Text>

      <Text className="font-bold mb-1">3. Propriété intellectuelle</Text>
      <Text className="mb-4">
        Le contenu du site, incluant textes, images, logos, vidéos, et autres éléments, est protégé par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite.
      </Text>

      <Text className="font-bold mb-1">4. Responsabilités</Text>
      <Text className="mb-4">
        Cyna ne saurait être tenue responsable des éventuels dommages directs ou indirects causés à l’utilisateur ou à un tiers lors de l’utilisation du site.
      </Text>

      <Text className="font-bold mb-1">5. Données personnelles</Text>
      <Text className="mb-4">
        Les informations personnelles recueillies sont traitées conformément à notre politique de confidentialité. Vous disposez d’un droit d’accès, de rectification et de suppression.
      </Text>

      <Text className="font-bold mb-1">6. Modifications des CGU</Text>
      <Text className="mb-4">
        Cyna se réserve le droit de modifier les présentes CGU à tout moment. L’utilisateur est invité à les consulter régulièrement.
      </Text>

      <Text className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Cyna. Tous droits réservés.
      </Text>
    </ScrollView>
  );
}