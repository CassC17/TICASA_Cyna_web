import { useState } from 'react';

export default function useUserLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log("Connexion réussie");
        setSuccess(true);
      } else {
        console.error("Erreur de connexion :", data.message || "Erreur inconnue");
        setError(data.message || "Erreur inconnue");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, success };
}