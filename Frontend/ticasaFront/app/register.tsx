import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import useUserRegister from '../hooks/useUserRegister';

export default function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

    const handleRegsiter = () => {
        let newErrors = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

        if (!firstName.trim()) {
            newErrors.firstName = "Le prénom est requis.";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Le nom est requis.";
        }

        if (!email.trim()) {
            newErrors.email = "L'email est requis.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Format d'email invalide.";
        }

        if (!password.trim()) {
            newErrors.password = "Le mot de passe est requis.";
        } else if (password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins une majuscule.";
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins une minuscule.";
        } else if (!/\d/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins un chiffre.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins un caractère spécial.";
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        setErrors(newErrors);

        if (!newErrors.firstName && !newErrors.lastName && !newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
            useUserRegister(firstName, lastName, email, password);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>

            <View>
                <View style={styles.inputNameContainer}>
                    <View>
                        <Text style={styles.label}>Prénom</Text>
                        <TextInput
                            style={[styles.input, errors.firstName ? styles.wrongInput : null]}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
                    </View>

                    <View>
                        <Text style={styles.label}>Nom</Text>
                        <TextInput
                            style={[styles.input, errors.lastName ? styles.wrongInput : null]}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Adresse email</Text>
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

                <View>
                    <Text style={styles.label}>Confirmer le mot de passe</Text>
                    <TextInput
                        style={[styles.input, errors.confirmPassword ? styles.wrongInput : null]}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                    {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegsiter}>
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text>Vous avez déjà un compte ?</Text>
                    <TouchableOpacity onPress={() => console.log("Page de connexion")}>
                        <Text style={styles.loginLink}>Connectez-vous.</Text>
                    </TouchableOpacity>
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
    inputNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginLink: {
        textDecorationLine: 'underline',
        color: '#007bff',
    },
});