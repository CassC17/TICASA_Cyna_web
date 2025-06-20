import { View, Text, ScrollView } from "react-native";
import Footer from "../../components/Footer";

export default function MentionsLegales() {
  return (
    <ScrollView className="flex-1 bg-primary">
      <View className="min-h-screen flex flex-col justify-between px-6 py-8">
        <Text className="text-2xl font-bold mb-4 text-white">
          Mentions légales
        </Text>

        <Text className="text-base mb-4 text-text">
          Conformément aux dispositions des articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie
          numérique, dite L.C.E.N., nous portons à la connaissance des
          utilisateurs et visiteurs du site les informations suivantes :
        </Text>

        <Text className="font-bold text-white">Éditeur</Text>
        <Text className="mb-4 text-text">
          Cyna SAS, 123 Avenue de la Cybersécurité, 75000 Paris -
          contact@cyna.com
        </Text>

        <Text className="font-bold text-white">Responsable de publication</Text>
        <Text className="mb-4 text-text">
          Monsieur Jean Dupont, Directeur Général
        </Text>

        <Text className="font-bold text-white">Hébergeur</Text>
        <Text className="mb-4 text-text">
          Vercel Inc. – 440 N Barranca Ave #4133, Covina, CA 91723, USA
        </Text>

        <Text className="font-bold text-white">Propriété intellectuelle</Text>
        <Text className="mb-4 text-text">
          Tout le contenu du présent site est la propriété de la société Cyna.
          Toute reproduction, distribution, modification, adaptation,
          retransmission ou publication, même partielle, de ces différents
          éléments est strictement interdite sans l’accord écrit de Cyna.
        </Text>

        <Text className="font-bold text-white">Données personnelles</Text>
        <Text className="mb-4 text-text">
          Ce site respecte les lois françaises sur la protection de la vie
          privée. Vous disposez d’un droit d’accès, de modification et de
          suppression de vos données.
        </Text>

        <Text className="mt-10 text-center text-sm text-text">
          © {new Date().getFullYear()} Cyna. Tous droits réservés.
        </Text>
      </View>

      <Footer />
    </ScrollView>
  );
}
