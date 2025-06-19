import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import useGetMe from "../../hooks/useGetMe";
import useModifyMe from "../../hooks/useModifyMe";

export default function EditProfile() {
  const { me, setMe, isLoading, error } = useGetMe();
  const {
    modifyMe,
    loading: modifyLoading,
    error: modifyError,
    success: modifySuccess,
  } = useModifyMe();

  const handleModifyMe = async () => {
    if (me) {
      await modifyMe(me.prenom, me.nom, me.email);
    }
  };

  return (
    <ScrollView className="flex-1 bg-primary px-5">
      <View className="flex-1 items-center justify-center w-full min-h-screen">
        <Text className="text-3xl font-bold text-white mb-8">
          Modifier mon profil
        </Text>

        <View className="w-full max-w-md">
          {isLoading || !me ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <>
              {["prenom", "nom", "email"].map((field) => (
                <View key={field} className="mb-4">
                  <Text className="text-white mb-1 capitalize">
                    {field === "prenom"
                      ? "Prénom"
                      : field === "nom"
                      ? "Nom"
                      : "Adresse e-mail"}
                  </Text>
                  <TextInput
                    className="w-full h-12 bg-primary-dark border border-gray-300 px-4 rounded-lg shadow-sm text-text mt-2"
                    value={me[field]?.toString()}
                    onChangeText={(text) =>
                      setMe((prev: any) => ({ ...prev, [field]: text.trim() }))
                    }
                    placeholder={`Votre ${field}`}
                    placeholderTextColor="#E0E0E0"
                    keyboardType={
                      field === "email" ? "email-address" : "default"
                    }
                    autoCapitalize={field === "email" ? "none" : "sentences"}
                  />
                </View>
              ))}

              {modifyError && (
                <Text className="text-red-500 text-sm text-center mb-4">
                  Erreur : {modifyError}
                </Text>
              )}

              {modifySuccess && (
                <Text className="text-green-400 text-sm text-center mb-4">
                  Profil mis à jour avec succès !
                </Text>
              )}

              <Pressable
                onPress={handleModifyMe}
                disabled={modifyLoading}
                className="bg-cta py-3 rounded-lg items-center shadow-md mt-2"
              >
                <Text className="text-primary font-bold text-lg">
                  {modifyLoading ? "Sauvegarde en cours..." : "Sauvegarder"}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
