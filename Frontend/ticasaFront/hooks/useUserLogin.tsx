import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

export default function useUserLogin(email: string, password: string) {
  useEffect(() => {
    fetch('http://localhost:3000/auth/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                console.log("Connexion réussie", `Connecté avec ${email}!`);
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la connexion : ", error);
        });
  }, []);
}