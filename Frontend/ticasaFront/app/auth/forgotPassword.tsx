import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ForgotPasswordScreen(){
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: ''});

    const handleForgotPassword = () => {
        let newErrors = { email: ''};

        if (!email.trim()) {
            newErrors.email = "L'email est requis.";
        }
        setErrors(newErrors);

        if (!newErrors.email) {
            console.log(`Email envoyé à ${email} !`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mot de passe oublié</Text>

            <View>
                <View>
                    <Text style={styles.label}>Adresse mail</Text>
                    <TextInput
                        style={[styles.input, errors.email ? styles.wrongInput : null]}
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                    <Text style={styles.buttonText}>Réinisialiser mon mot de passe</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    label: {
        marginTop: 15,
        marginBottom: 5,
        color: '#000',
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        paddingLeft: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    wrongInput: {
        borderColor: '#ff0000',
        borderWidth: 2,
    },
    errorText: {
        color: '#ff0000',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    button: {
        width: '100%',
        height: 50,
        padding: 20,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        shadowColor: '#007bff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});