import React, { useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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

                <View>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        style={[styles.input, errors.password ? styles.wrongInput : null]}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                </View>

                <Link href="auth/forgotPassword"><Text style={styles.registerLink}>Mot de passe oublié ?</Text></Link>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text>Vous n'avez pas de compte ?</Text>
                    <Link href="auth/register"><Text style={styles.registerLink}>Inscrivez-vous.</Text></Link>
                </View>
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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerLink: {
        textDecorationLine: 'underline',
        color: '#007bff',
    },
});