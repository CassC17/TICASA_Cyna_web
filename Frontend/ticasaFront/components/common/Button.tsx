import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ButtonProps{
    text?: string,
    onPress: () => void
}

export default function Input({ 
    text="Envoyer", 
    onPress
}: ButtonProps) {

    return (
        <TouchableOpacity onPress={onPress} className="w-full h-12 bg-blue-500 justify-center items-center mt-5 rounded-lg shadow-lg">
            <Text className="text-white text-lg font-bold">{text}</Text>
        </TouchableOpacity>
    );
}