import { useState } from 'react';

export default function useIsLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const logoutUser = async (token: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
      throw new Error('Token non trouvé dans la session');
      }

      const response = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("Déconnexion réussie");
        setSuccess(true);
      } else {
        console.error("Erreur de déconnexion :", data.message || "Erreur inconnue");
        setError(data.message || "Erreur inconnue");
      }
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
      setError("Erreur de déconnexion au serveur.");
    }
  };

  return { logoutUser, loading, error, success };
}