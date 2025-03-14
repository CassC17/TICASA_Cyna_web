import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiUrl } from "../config";
import { router } from "expo-router";

export default function useUserLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const logoutUser = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = await AsyncStorage.getItem("token"); 
      if (!token) {
        throw new Error("Token non trouvé");
      }

      const response = await fetch(`${getApiUrl()}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("Déconnexion réussie");
        setSuccess(true);
        router.push("/");
        await AsyncStorage.removeItem("token"); 
      } else {
        console.error("Erreur de déconnexion :", data.message || "Erreur inconnue");
        setError(data.message || "Erreur inconnue");
      }
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
      setError("Erreur de déconnexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return { logoutUser, loading, error, success };
}
