import { Text, TextInput, Button, ScrollView, ActivityIndicator, View } from 'react-native';
import useGetMe from '../../hooks/useGetMe';
import useModifyMe from '../../hooks/useModifyMe';

export default function EditProfile() {
    const { me, setMe, isLoading, error } = useGetMe();
    const { modifyMe, loading: modifyLoading, error: modifyError, success: modifySuccess } = useModifyMe();

    const handleModifyMe = async () => {
        await modifyMe(me.prenom, me.nom, me.email);
    };

    return (
        <ScrollView className="p-8">
            <Text className="text-2xl mb-4">Modifier mon profil</Text>

            {isLoading || !me ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <>
                {['prenom', 'nom', 'email'].map((f) => (
                    <TextInput
                        key={f}
                        className="border p-2 mb-3"
                        value={me[f].toString()}
                        onChangeText={(v) =>
                            setMe((prev: any) => ({ ...prev, [f]: v.trim() }))
                        }
                    />
                ))}

                {modifyError && (
                    <Text className="text-red-500 text-center mb-4">
                    Erreur : {modifyError}
                    </Text>
                )}

                {modifySuccess && (
                    <Text className="text-green-600 text-center mb-4">
                    Profil mis à jour avec succès !
                    </Text>
                )}

                <Button
                    title={modifyLoading ? 'Sauvegarde en cours...' : 'Sauvegarder'}
                    onPress={handleModifyMe}
                    disabled={modifyLoading}
                />
                </>
            )}
        </ScrollView>
    );
}