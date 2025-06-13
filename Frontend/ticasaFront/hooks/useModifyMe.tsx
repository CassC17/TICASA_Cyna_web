import { useState, useEffect } from "react";
import { getApiUrl } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useModifyMe() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const modifyMe = async (firstname: string, lastname: string, email: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

    const token = await AsyncStorage.getItem('token');

    try {
        const response = await fetch(`${getApiUrl()}/auth/me`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                nom: lastname,
                prenom: firstname,
                email: email
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(true);
            setError(null);
        } else {
            setError(data.message || "Erreur inconnue");
        }
        } catch (err) {
            setError("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
        }
    };

  return { modifyMe, loading, error, success };
}