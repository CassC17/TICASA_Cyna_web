import { Text, TextInput, Button, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../config';
import useGetMe from '../../hooks/useGetMe';

export default function EditProfile() {
  
    const { me, setMe, isLoading, error } = useGetMe();

    if (isLoading) return <Text>Chargement...</Text>;
    if (error) return <Text>Erreur: {error.message}</Text>;


    const save = async () => {
        const token = await AsyncStorage.getItem('token');
        await fetch(`${getApiUrl()}/me`, {
            method: 'PUT', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
            body: JSON.stringify({
                firstame: me.firstname,
                lastname: me.lastname,
                email: me.email,
            }),
        });
    };

    return (
        <ScrollView className="p-8">
        <Text className="text-2xl mb-4">Modifier mon profil</Text>
        {['firstname','lastname','email'].map(f => (
            <TextInput
            key={f} className="border p-2 mb-3" value={me[f].toString()} onChangeText={v => setMe((prev:any) => ({ ...prev, [f]: v }))}
            />
        ))}
        <Button title="Sauvegarder" onPress={save} />
        </ScrollView>
    );
}