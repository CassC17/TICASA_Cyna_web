import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

export default function useUserRegister(firstName: string, lastName: string, email: string, password: string) {
  useEffect(() => {
    fetch('http://localhost:3000/auth/register', {
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
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 201) {
                console.log("Inscription réussie");
            }
        })
        .catch((error) => {
            console.error("Erreur lors de l'inscription : ", error);
        });
  }, []);
}