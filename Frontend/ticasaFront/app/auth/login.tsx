import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import useUserLogin from '../../hooks/useUserLogin';

export default function LoginScreen() {
    const { loginUser, loading, error, success } = useUserLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleLogin = () => {
        let newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = "L'email est requis.";
        }

        if (!password.trim()) {
            newErrors.password = "Le mot de passe est requis.";
        }

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {
            loginUser(email, password)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            <TextInput
                style={[styles.input, errors.email ? styles.wrongInput : null]}
                placeholder="Adresse email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput
                style={[styles.input, errors.password ? styles.wrongInput : null]}
                placeholder="Mot de passe"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <TouchableOpacity onPress={() => console.log("Mot de passe oublié")}>
                <Text style={styles.signupText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>

            <View style={styles.checkboxContainer}>
                <Checkbox 
                    value={isChecked} 
                    onValueChange={setChecked} 
                    color={isChecked ? "#007bff" : undefined} 
                    style={styles.checkbox}
                />
                <Text style={styles.checkboxText}>Rester connecté</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Page inscription")}>
                <Text style={styles.signupText}>Pas encore de compte ? Inscrivez-vous.</Text>
            </TouchableOpacity>
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
    paragraph: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        marginRight: 10,
    },
    checkboxText: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
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
    signupText: {
        marginTop: 20,
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});