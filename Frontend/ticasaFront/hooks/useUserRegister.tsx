import { useState } from 'react';
import { getApiUrl } from '../config'; 

export default function useUserRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${getApiUrl()}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: firstName,
          prenom: lastName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log("Inscription réussie");
        setSuccess(true);
      } else {
        console.error("Erreur d'inscription :", data.message || "Erreur inconnue");
        setError(data.message || "Erreur inconnue");
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
}
