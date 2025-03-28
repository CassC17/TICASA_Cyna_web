import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import Input from "../components/common/Input";

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

                <Input label="Adresse mail" value={email} onChangeText={setEmail} />
                <Input label="Sujet du message" value={subject} onChangeText={setSubject} />
                <Input label="Message" value={message} onChangeText={setMessage} multiline={true} textAlignVertical="top" variant="textarea" />

                <TouchableOpacity onPress={handleSubmit} className="w-full h-12 bg-blue-500 justify-center items-center mt-5 rounded-lg shadow-lg">
                    <Text className="text-white text-lg font-bold">Envoyer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}