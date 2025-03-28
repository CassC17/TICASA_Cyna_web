import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function ContactPage() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        console.log(email, subject, message);
    };

    return (
        <View className="flex-1 justify-center items-center px-5 bg-gray-100">
            <Text className="text-2xl font-bold text-gray-800 mb-8">Contactez-nous</Text>
            
            <View className="w-full max-w-md">
                <View>
                    <Text className="mt-4 mb-1 text-black text-lg">Adresse mail</Text>
                    <TextInput
                        className="w-full h-12 border rounded-lg px-4 text-lg bg-white shadow"
                        value={email}
                        onChangeText={setEmail} 
                    />
                </View>
                <View>
                    <Text className="mt-4 mb-1 text-black text-lg">Sujet du message</Text>
                    <TextInput 
                        className="w-full h-12 border rounded-lg px-4 text-lg bg-white shadow"
                        value={subject} 
                        onChangeText={setSubject}
                    />
                </View>
                <View>
                    <Text className="mt-4 mb-1 text-black text-lg">Message</Text>
                    <TextInput
                        className="w-full h-40 border rounded-lg px-4 py-2 text-lg bg-white shadow"
                        value={message}
                        onChangeText={setMessage}
                        multiline={true}
                        textAlignVertical="top"
                    />
                </View>

                <TouchableOpacity onPress={handleSubmit} className="w-full h-12 bg-blue-500 justify-center items-center mt-5 rounded-lg shadow-lg">
                    <Text className="text-white text-lg font-bold">Envoyer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}